import { SafeAreaView } from "react-native-safe-area-context";
import RootNavigation from "./Navigation/index";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function App() {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* content */}
        <RootNavigation />
      </GestureHandlerRootView>
    </>
  );
}

export default App;
