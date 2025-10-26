"use client";

import React, { useState, useTransition } from "react";
import SumsubWebSdk from "@sumsub/websdk-react";
import { getSumsumbTokenAction } from "@/lib/actions/auth.actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BaseButton from "@/components/ui/buttons/base-button";

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

export default function Sumsub({ auth }: { auth?: boolean }) {
  const [isPending, startTransition] = useTransition();
  const [token, setToken] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initializeSumsub = (): Promise<string> => {
    return new Promise((res) => {
      startTransition(async () => {
        const rsp = await getSumsumbTokenAction();
        if (!rsp?.error) {
          setToken(rsp?.data as string);
          res(rsp?.data as string);
        }
      });
    });
  };

  const handleStartVerification = async () => {
    await initializeSumsub();
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setToken(""); // Reset token when modal closes
  };

  // Handle Sumsub messages
  // const messageHandler = (message: any) => {
  //   console.log("Sumsub message:", message);

  //   // Check for verification completion events
  //   if (
  //     message?.type === "idCheck.onReady" ||
  //     message?.type === "idCheck.onFinished" ||
  //     message?.type === "idCheck.onError"
  //   ) {
  //     // If verification is successful, revalidate the profile data
  //     if (
  //       message?.type === "idCheck.onFinished" &&
  //       message?.payload?.reviewResult?.reviewAnswer === "GREEN"
  //     ) {
  //       console.log("Verification successful!");

  //       // Call revalidateTag in a server action
  //       startTransition(async () => {
  //         try {
  //           // You can create a separate server action for this
  //           await revalidateProfileAction();
  //         } catch (error) {
  //           console.error("Error revalidating profile data:", error);
  //         }
  //       });
  //     }
  //   }
  // };

  // // Handle Sumsub errors
  // const errorHandler = (error: any) => {
  //   console.error("Sumsub error:", error);
  // };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
      <DialogTrigger asChild>
        {auth ? (
          <BaseButton
            onClick={handleStartVerification}
            className="w-full px-6 !text-base lg:w-fit"
            isSubmitting={isPending}
          >
            Verify my Identity
          </BaseButton>
        ) : (
          <button
            onClick={handleStartVerification}
            disabled={isPending}
            className="text-Purple-500 !h-auto !border-none !bg-transparent !p-0 text-start text-sm font-semibold whitespace-nowrap underline lg:text-base"
          >
            {isPending ? "Starting...." : "Start verification"}
          </button>
        )}
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="max-h-[98vh] overflow-x-hidden overflow-y-auto p-0"
      >
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="!text-center text-base font-semibold"></DialogTitle>
        </DialogHeader>
        <div className="flex-1 p-6 pt-0">
          {token && (
            <div className="h-full w-full">
              <SumsubWebSdk
                accessToken={token}
                expirationHandler={initializeSumsub}
                // onMessage={messageHandler}
                // onError={errorHandler}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
