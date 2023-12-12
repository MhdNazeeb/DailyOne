import { SafeAreaView } from "react-native-safe-area-context";
import RootNavigation from "./Navigation/index";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StripeProvider } from "@stripe/stripe-react-native";
import { publishableKey } from "@env";

function App() {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StripeProvider publishableKey={publishableKey}>
          {/* content */}
          <RootNavigation />
        </StripeProvider>
      </GestureHandlerRootView>
    </>
  );
}

export default App;
