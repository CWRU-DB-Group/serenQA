import {useState, useEffect} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {
  Form,
  FormControl, FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {useUser} from "@/components/UserContext"
import {Checkbox} from "@/components/ui/checkbox"
import Link from "next/link";
import {LinkIcon} from "lucide-react";

type LLMRanking = {
  entity_name: string;
  "llm_rank": number;
  "entity_link": string;
}

export type Question = {
  question_number: number;
  qid: number;
  text: string;
  category: string;
  llm_ranking: LLMRanking[];
}

const questionResponseSchema = z.object({
  question_id: z.string(),
  question: z.string(),
  entity_responses: z.record(z.string().min(1, "Please provide a response")),
  not_sure: z.boolean().optional()
});

const batchFormSchema = z.object({
  confidence: z.number().min(1).max(5).refine(value => value !== undefined, {
    message: "Confidence level is required",
  }),
  responses: z.array(questionResponseSchema)
});

type BatchFormValues = z.infer<typeof batchFormSchema>;

const getDefaultValues = (questions: Question[]): BatchFormValues => {
  return {
    confidence: 1,
    responses: questions.filter(question =>
      question &&
      question.qid &&
      question.text &&
      Array.isArray(question.llm_ranking)
    ).map(question => ({
      question_id: question.qid.toString(),
      question: `${question.question_number} - ${question.text}`,
      entity_responses: question.llm_ranking.reduce((acc, entity) => {
        if (entity && typeof entity === 'object' && 'entity_name' in entity && 'llm_rank' in entity) {
          acc[entity.entity_name] = entity.llm_rank.toString()
        }
        return acc;
      }, {} as Record<string, string>),
      not_sure: false
    }))
  };
};

const BatchForm = ({onComplete, batchId, questions}: {
  questions: Question[],
  batchId: number,
  onComplete: (id: string) => void
}) => {
  const {userEmail} = useUser();
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const questionsPerPage = 10;

  const form = useForm<BatchFormValues>({
    resolver: zodResolver(batchFormSchema),
    defaultValues: getDefaultValues(questions)
  });

  const saveDraftToCloud = async (data: BatchFormValues) => {
    try {
      const formData = {
        email: userEmail,
        batch: `${String(batchId)}#draft`,
        confidence: String(data.confidence),
        responses: data.responses
      };

      await fetch(
        'https://aczdehksh2.execute-api.us-east-1.amazonaws.com/test/batch_response',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      );
    } catch (error) {
      console.error('Error saving draft to cloud:', error);
    }
  };

  const loadSavedResponses = async () => {
    try {
      const params = new URLSearchParams({
        email: userEmail,
        batchId: batchId.toString()
      });

      const response = await fetch(
        `https://aczdehksh2.execute-api.us-east-1.amazonaws.com/test/response?${params}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        const savedData = await response.json();
        if (savedData && savedData.res && savedData.res.length > 0) {
          // If we have valid saved data, use it
          form.reset(savedData.res[0]);
        } else {
          // If no valid saved data, use default values from questions
          const defaultValues = getDefaultValues(questions);
          form.reset(defaultValues);
        }
      } else {
        // If API call fails, use default values from questions
        const defaultValues = getDefaultValues(questions);
        form.reset(defaultValues);
      }
    } catch (error) {
      console.error('Error loading saved responses:', error);
      // If API call errors, use default values from questions
      const defaultValues = getDefaultValues(questions);
      form.reset(defaultValues);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadSavedResponses();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [batchId, questions]);

  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const currentQuestions = questions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );

  const onSubmit = async (values: BatchFormValues) => {
    values.responses = values.responses.slice(0, questions.length);

    const formData = {
      email: userEmail,
      batch: `${String(batchId)}#final`,
      confidence: String(values.confidence),
      responses: values.responses
    };

    try {
      const response = await fetch(
        'https://aczdehksh2.execute-api.us-east-1.amazonaws.com/test/batch_response',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      );

      if (response.ok) {
        alert(`Batch ${batchId} responses submitted successfully!`);
        if (batchId === 6) {
          onComplete('instructions');
        }
        onComplete(`batch${batchId}`);
      } else {
        alert('Failed to submit batch responses. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting batch responses:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const handlePageChange = (newPage: number) => {
    const currentValues = form.getValues();
    saveDraftToCloud(currentValues);
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Batch {batchId}</CardTitle>
        <CardDescription>Please answer all questions in this batch</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="confidence"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Confidence Level (1-5)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={5}
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            {currentQuestions.map((question, index) => {
              const responseIndex = currentPage * questionsPerPage + index;
              return (
                <div key={question.qid} className="space-y-4 border-t pt-4">
                  <div className="space-y-2">
                    <p className="font-medium">
                      {question.question_number} - {question.text}
                    </p>
                    <p className="text-sm text-gray-500">Category - {question.category}</p>
                    {Array.isArray(question.llm_ranking) ? question.llm_ranking.map((entity) => (
                      <FormField
                        key={entity.entity_name}
                        control={form.control}
                        name={`responses.${responseIndex}.entity_responses.${entity.entity_name}`}
                        render={({field}) => (
                          <FormItem className="flex flex-row items-center justify-between">
                            <div>
                              <FormLabel>{entity.entity_name}</FormLabel>
                              <FormDescription>
                                <Link href={entity.entity_link ? entity.entity_link.toString() : ''} target="_blank"
                                      className="flex gap-x-2 items-center">
                                  Resource <LinkIcon size={16}/>
                                </Link>
                              </FormDescription>
                            </div>
                            <FormControl className="w-1/2">
                              <Input {...field} value={field.value || ''}/>
                            </FormControl>
                            <FormMessage/>
                          </FormItem>
                        )}
                      />
                    )) : null}

                    <FormField
                      control={form.control}
                      name={`responses.${responseIndex}.not_sure`}
                      render={({field}) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <FormLabel>I am not sure of this question</FormLabel>
                          <FormControl className='w-1/2'>
                            <div className="flex items-start">
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </div>
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              );
            })}

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault()
                  handlePageChange(Math.max(0, currentPage - 1))
                }}
                disabled={currentPage === 0}
              >
                Previous
              </Button>

              {currentPage === totalPages - 1 ? (
                <Button type="submit">Submit Batch</Button>
              ) : (
                <Button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    handlePageChange(Math.min(totalPages - 1, currentPage + 1))
                  }}
                >
                  Save and next
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BatchForm;