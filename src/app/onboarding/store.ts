import { TOnboardingSchema } from '@/features/onboarding/schema';
import { create } from 'zustand';

type OnboardingState = Partial<TOnboardingSchema> & {
  setData: (data: Partial<TOnboardingSchema>) => void;
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  setData: (data) => set(data),
}));
