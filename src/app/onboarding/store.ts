import { TOnboardingSchema } from '@/features/onboarding/schema';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type OnboardingState = Partial<TOnboardingSchema> & {
  setData: (data: Partial<TOnboardingSchema>) => void;
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      setData: (data) => set(data),
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
