import { useState, useEffect } from "react";

export function useCart() {
  useEffect(() => {
    console.log("Hello");

    return () => {}; // cleanup function
  }, []);
}
