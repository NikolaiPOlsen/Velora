import { Redirect } from "expo-router";
const app = () => {
  return (
    <Redirect href="/(auth)/login" />
  );
}

export default app;