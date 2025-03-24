
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  gender: z.enum(["male", "female", "transgender"], {
    required_error: "Please select a gender",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface SimpleAuthFormProps {
  mode: "login" | "signup";
  onSubmit: (data: FormData) => void;
}

export function SimpleAuthForm({ mode, onSubmit }: SimpleAuthFormProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      gender: "male",
    },
  });

  const handleSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")}
            className="p-0 h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="mx-auto">
            <Logo size="md" withText variant="horizontal" />
          </div>
          <div className="w-8"></div>
        </div>
        <CardTitle className="text-2xl text-center">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </CardTitle>
        <CardDescription className="text-center">
          {mode === "login" 
            ? "Enter your credentials to access your account" 
            : "Fill in your details to create an account"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="Enter your password" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-6"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="male" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          Male
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="female" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          Female
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="transgender" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          Transgender
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  <span>{mode === "login" ? "Logging in..." : "Creating account..."}</span>
                </div>
              ) : (
                <span>{mode === "login" ? "Log in" : "Sign up"}</span>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="text-center text-sm text-muted-foreground">
          {mode === "login" ? (
            <div>
              Don't have an account?{" "}
              <Button variant="link" onClick={() => navigate("/signup")} className="p-0 h-auto">
                Sign up
              </Button>
            </div>
          ) : (
            <div>
              Already have an account?{" "}
              <Button variant="link" onClick={() => navigate("/login")} className="p-0 h-auto">
                Log in
              </Button>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
