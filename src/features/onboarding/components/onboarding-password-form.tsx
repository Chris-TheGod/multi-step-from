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
import { useRouter } from 'next/navigation';
import { useOnboardingStore } from '@/app/onboarding/store';

const onboardingPasswordSchema = onboardingSchema.pick({
  password: true,
  repeatPassword: true,
});

type OnboardingPasswordSchema = z.infer<typeof onboardingPasswordSchema>;

export default function OnboardingPasswordForm() {
  const router = useRouter();

  const setData = useOnboardingStore((state) => state.setData);

  const form = useForm<OnboardingPasswordSchema>({
    resolver: zodResolver(onboardingPasswordSchema),
    defaultValues: {
      password: '',
      repeatPassword: '',
    },
  });

  const onSubmit = (data: OnboardingPasswordSchema) => {
    setData(data);
    router.push('/onboarding/username');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-[300px] space-y-8'
      >
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder='***********' {...field} type='password' />
              </FormControl>
              <FormDescription>This is your password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='repeatPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder='***********' {...field} type='password' />
              </FormControl>
              <FormDescription>
                This is your password confirmation.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Next</Button>
      </form>
    </Form>
  );
}
