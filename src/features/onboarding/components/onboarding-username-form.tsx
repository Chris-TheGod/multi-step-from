'use client';

import { useForm } from 'react-hook-form';
import { onboardingSchema } from '../schema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useOnboardingStore } from '@/app/onboarding/store';
import { Checkbox } from '@/components/ui/checkbox';

const onboardingUsernameSchema = onboardingSchema.pick({
  username: true,
  terms: true,
});

type OnboardingUsernameSchema = z.infer<typeof onboardingUsernameSchema>;

export default function OnboardingUsernameForm() {
  const firstName = useOnboardingStore((state) => state.firstName);
  const lastName = useOnboardingStore((state) => state.lastName);
  const password = useOnboardingStore((state) => state.password);
  const repeatPassword = useOnboardingStore((state) => state.repeatPassword);

  const form = useForm<OnboardingUsernameSchema>({
    resolver: zodResolver(onboardingUsernameSchema),
    defaultValues: {
      username: '',
      terms: false,
    },
  });

  const onSubmit = (data: OnboardingUsernameSchema) => {
    console.log({
      ...data,
      firstName,
      lastName,
      password,
      repeatPassword,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-[300px] space-y-8'
      >
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='John' {...field} />
              </FormControl>
              <FormDescription>This is your username.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='terms'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className='space-y-1 leading-none'>
                <FormLabel>I agree to the terms of service.</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Next</Button>
      </form>
    </Form>
  );
}
