"use client"
import React, {useEffect, useState} from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {Instructions} from "@/components/Instructions";
import {useUser, UserContext} from "@/components/UserContext";
import BatchForm from "@/components/Batch";
import Image from "next/image";

import img1 from "@/assets/IMG_0090.png";
import img2 from "@/assets/IMG_0089.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CategoryCards from "@/components/CategoryCards";
import category from "@/lib/category";

// Form Schemas
const userFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  affiliation: z.string().min(2, {
    message: "Affiliation must be at least 2 characters.",
  }),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

const Header = () => {

  const [imageModal, setImageModal] = useState(false);

  return (
    <div className="text-center py-8">
      <Dialog open={imageModal} onOpenChange={() => {
        setImageModal(false);
      }}>
        <DialogContent className="sm:max-w-[725px] max-h-[85%] overflow-auto">
          <DialogHeader>
            <DialogTitle>Examples</DialogTitle>
            A serendipitous answer to a question refers to one that introduces unexpected insights or discoveries, often
            accompanied by a sense of novelty in scientific research.
            We provide two examples of serendipity in drug discovery. Please see the images below for reference.
          </DialogHeader>
          <div className="space-y-8 scroll-auto">
            <Image src={img1} alt="image1"/>
            <Image src={img2} alt="image1"/>
          </div>
        </DialogContent>
      </Dialog>
      <h1 className="text-4xl font-bold mb-4">DrugKG Questionnaire</h1>
      <p className="text-gray-600 max-w-2xl mx-auto mb-4">
        We are conducting this evaluation to establish a benchmark for assessing<Button variant="link"
                                                                                        onClick={(e) => {
                                                                                          e.preventDefault();
                                                                                          setImageModal(true);
                                                                                        }}><span
        className="text-blue-600 text-lg font-bold">serendipity</span></Button>
        in Knowledge Graph Question Answering (KGQA) for Drug Discovery.
        Your feedback is greatly appreciated!
      </p>
      <p className="text-gray-600">
        If you have any questions, please contact us at{' '}
        <span className="underline">mxw767@case.edu</span>
      </p>
    </div>
  )
}

const UserForm = () => {
  const {setUserEmail, setIsLoggedIn, isLoggedIn} = useUser()
  const form = useForm({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      affiliation: "",
      title: "",
      email: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof userFormSchema>) => {
    try {
      const response = await fetch(
        'https://aczdehksh2.execute-api.us-east-1.amazonaws.com/test/user_info',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          mode: 'cors',
          credentials: 'omit',
          body: JSON.stringify({
            name: values.name,
            affiliation: values.affiliation,
            title: values.title,
            email: values.email
          })
        }
      )

      if (response.ok) {
        setUserEmail(values.email)
        setIsLoggedIn(true)
        window.localStorage.setItem('userEmail', values.email)
        window.localStorage.setItem('isLoggedIn', 'true')
        alert('Information submitted successfully!')
        form.reset()
      } else {
        const errorData = await response.json()
        alert(errorData.message || 'Failed to submit information. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred. Please try again later.')
    }
  }
  if (isLoggedIn) {
    return null
  }
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>About You</CardTitle>
        <CardDescription>Please provide your information to begin the questionnaire.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="affiliation"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Affiliation</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Submit Information</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

const BatchFormComponent = ({batchId, onComplete}: {
  batchId: number;
  onComplete: (id: string) => void;
}) => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`/batch${batchId}.json`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [batchId]);

  return (
    <BatchForm
      questions={questions}
      batchId={batchId}
      onComplete={onComplete}
    />
  );
};

const UserProvider = ({children}: { children: React.ReactNode }) => {
  const [initialized, setInitialized] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedLoginStatus = localStorage.getItem('isLoggedIn');

    setUserEmail(storedEmail || "");
    setIsLoggedIn(storedLoginStatus === 'true');
    setInitialized(true);
  }, []);

  if (!initialized) {
    return null;
  }

  return (
    <UserContext.Provider value={{userEmail, setUserEmail, isLoggedIn, setIsLoggedIn}}>
      {children}
    </UserContext.Provider>
  );
};

const Questionnaire = () => {
  const [activeTab, setActiveTab] = useState("instructions")
  const [completedBatches, setCompletedBatches] = useState<string[]>([])
  const {isLoggedIn, userEmail, setIsLoggedIn, setUserEmail} = useUser()

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleBatchComplete = (batchId: string) => {
    setCompletedBatches(prev => [...prev, batchId])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>

      {isLoggedIn && (
        <p className="text-center text-green-600 font-bold">You are logged in as {userEmail}. <Button variant="link"
                                                                                                      onClick={() => {
                                                                                                        setIsLoggedIn(false)
                                                                                                        setUserEmail('')
                                                                                                        window.localStorage.removeItem('userEmail')
                                                                                                        window.localStorage.removeItem('isLoggedIn')
                                                                                                      }}>Use as another
          user?</Button></p>
      )}

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-7 mb-20">
            <TabsTrigger value="instructions">
              Instructions
            </TabsTrigger>
            {isLoggedIn && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((batch) => (
              <TabsTrigger key={batch} value={`batch${batch}`}>
                Batch {batch} {completedBatches.includes(`batch${batch}`) && '✓'}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="instructions" className="space-y-8">
            <UserForm/>
            <Instructions/>
            {isLoggedIn ? <CategoryCards categories={category} onClick={setActiveTab}/> : <CategoryCards categories={category} onClick={console.log}/>}
          </TabsContent>

          {isLoggedIn && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((batch) => (
            <TabsContent key={batch} value={`batch${batch}`}>
              <BatchFormComponent
                batchId={batch}
                onComplete={handleBatchComplete}
              />
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <footer className="text-center py-8 mt-8 border-t">
        <p>© 2024-2025 SerenQA Team. All Rights Reserved.</p>
      </footer>
    </div>
  )
}

export default function Page() {
  return (
    <UserProvider>
      <Questionnaire/>
    </UserProvider>
  )
}