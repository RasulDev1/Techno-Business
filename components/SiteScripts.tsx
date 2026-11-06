"use client";

import { useEffect } from "react";
import { initSite } from "@/lib/site";

// Оживляет страницу после загрузки: журнал заявок, карусели, премиум-режим и остальное
export default function SiteScripts() {
  useEffect(() => {
    initSite();
  }, []);
  return null;
}
