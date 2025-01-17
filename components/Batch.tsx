import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useUser } from "@/components/UserContext"

export type Question = {
  question_number: number;
  qid: number;
  text: string;
  category: string;
  llm_ranking: string;
}

const questionResponseSchema = z.object({
  question: z.string(),
  answer: z.string().min(1, "Please select an answer"),
  ranking: z.string().nullable()
}).refine(data => {
  if (data.answer === "No") {
    return data.ranking !== null && data.ranking !== "";
  }
  return true;
}, {
  message: "Please enter a ranking when answer is No",
  path: ["ranking"]
});

const batchFormSchema = z.object({
  confidence: z.number().min(1).max(5).refine(value => value !== undefined, {
    message: "Confidence level is required",
  }),
  responses: z.array(questionResponseSchema)
});

type BatchFormValues = z.infer<typeof batchFormSchema>;

const BatchForm = ({ onComplete, batchId, questions }: { questions: Question[], batchId: number, onComplete: (id: string) => void }) => {
  const { userEmail } = useUser();
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 10;

  const form = useForm<BatchFormValues>({
    resolver: zodResolver(batchFormSchema),
    defaultValues: {
      confidence: 1,
      responses: questions.map(question => ({
        question: `${question.question_number} - ${question.text}`,
        answer: "",
        ranking: null
      }))
    },
  });

  useEffect(() => {
    const savedResponses = localStorage.getItem(`batch${batchId}Responses`);
    if (savedResponses) {
      const parsed = JSON.parse(savedResponses);
      if (parsed.responses && Array.isArray(parsed.responses)) {
        parsed.responses = parsed.responses.slice(0, questions.length);
      }
      form.reset(parsed);
    }
  }, []);

  const saveToLocalStorage = (data: BatchFormValues) => {
    localStorage.setItem(`batch${batchId}Responses`, JSON.stringify(data));
  };

  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const currentQuestions = questions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );

  const onSubmit = async (values: BatchFormValues) => {
    values.responses = values.responses.slice(0, questions.length);

    const formData = {
      email: userEmail,
      batch: String(batchId),
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
        localStorage.removeItem(`batch${batchId}Responses`);
        alert(`Batch ${batchId} responses submitted successfully!`);
        form.reset();
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
    saveToLocalStorage(currentValues);
    setCurrentPage(newPage);
  };

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
              render={({ field }) => (
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
                  <FormMessage />
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
                    <p className="text-sm text-gray-500">{question.category}</p>
                    <p className="text-sm">LLM Ranking: {question.llm_ranking}</p>
                  </div>

                  <FormField
                    control={form.control}
                    name={`responses.${responseIndex}.answer`}
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => {
                              field.onChange(value);
                              if (value === "Yes") {
                                form.setValue(`responses.${responseIndex}.ranking`, null);
                              }
                              const currentValues = form.getValues();
                              saveToLocalStorage(currentValues);
                            }}
                            value={field.value}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="Yes" id={`${responseIndex}-yes`} />
                              <Label htmlFor={`${responseIndex}-yes`}>Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="No" id={`${responseIndex}-no`} />
                              <Label htmlFor={`${responseIndex}-no`}>No</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch(`responses.${responseIndex}.answer`) === "No" && (
                    <FormField
                      control={form.control}
                      name={`responses.${responseIndex}.ranking`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter your ranking"
                              {...field}
                              value={field.value || ''}
                              onChange={(e) => {
                                field.onChange(e.target.value);
                                const currentValues = form.getValues();
                                saveToLocalStorage(currentValues);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
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
                  Next
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