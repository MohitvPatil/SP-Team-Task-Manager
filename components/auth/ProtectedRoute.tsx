"use client";

import {
  useEffect,
} from "react";

import { useRouter } from "next/navigation";

import Loader from "@/components/ui/Loader";

import useAuth from "@/hooks/useAuth";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router =
    useRouter();

  const {
    user,
    loading,
  } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [
    user,
    loading,
    router,
  ]);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}