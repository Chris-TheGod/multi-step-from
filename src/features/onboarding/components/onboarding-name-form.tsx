import { onboardingSchema } from '../schema';

const onboardingNameSchema = onboardingSchema.pick({
  firstName: true,
  lastName: true,
});

export default function OnboardingNameForm() {
  return <div>name</div>;
}
