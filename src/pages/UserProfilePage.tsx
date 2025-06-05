import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast"; // Assuming shadcn toast is set up

const profileFormSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters.").max(20, "Username too long."),
  email: z.string().email("Invalid email address."),
  bio: z.string().max(160, "Bio too long.").optional(),
  notificationsEnabled: z.boolean().default(true).optional(),
  streamingQuality: z.enum(["auto", "low", "standard", "high"]).default("auto"),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Default values for the form
const defaultValues: Partial<ProfileFormValues> = {
  username: "DoraemonFan_22",
  email: "doraemon@example.com",
  bio: "Loves gadgets and dorayaki. Exploring new music!",
  notificationsEnabled: true,
  streamingQuality: "high",
};

const UserProfilePage: React.FC = () => {
  console.log('UserProfilePage loaded');

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    console.log("Profile updated:", data);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  }

  return (
    <ScrollArea className="h-full p-4 md:p-6">
      <div className="container mx-auto max-w-3xl py-8">
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://source.unsplash.com/random/100x100?avatar,robot&sig=userDoraemon" alt="@shadcn" />
              <AvatarFallback>DF</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{form.watch("username") || "User Name"}</CardTitle>
              <CardDescription>{form.watch("email") || "user@example.com"}</CardDescription>
            </div>
          </CardHeader>
        </Card>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Manage your public profile and account details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Your username" {...field} />
                      </FormControl>
                      <FormDescription>This is your public display name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <textarea
                          placeholder="Tell us a little about yourself"
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Customize your application experience.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="notificationsEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Enable Notifications</FormLabel>
                        <FormDescription>Receive updates about new music and features.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="streamingQuality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Streaming Quality</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="auto">Auto</option>
                          <option value="low">Low</option>
                          <option value="standard">Standard</option>
                          <option value="high">High</option>
                        </select>
                      </FormControl>
                      <FormDescription>Higher quality uses more data.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={!form.formState.isDirty || !form.formState.isValid}>
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </ScrollArea>
  );
};

export default UserProfilePage;