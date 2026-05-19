"use client";
import { Profile } from "@/app/Components/Profile";
import useClientSide from "@/app/hooks/useClientSide";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import 'chat-widget-sdk/style.css'

// import { infoWallet, PasskeyProvider } from "sdk-v2-egglegamewallet";
const queryClient = new QueryClient();
export default function Home() {
  const isClient = useClientSide();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
           {/* <PasskeyProvider config={{ 
            rpcUrl:{
              1: "https://rpc.ankr.com/eth",
              137: "https://rpc.ankr.com/polygon",
            }
           }} > */}
          {isClient && <Profile />}
        
        {/* </PasskeyProvider> */}
       
      </QueryClientProvider>
    </div>
  );
}
