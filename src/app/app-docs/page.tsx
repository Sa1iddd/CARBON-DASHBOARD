"use client";

import { useEffect, useRef } from "react";
import SwaggerUI from "swagger-ui-dist";
import "swagger-ui-dist/swagger-ui.css";

export const dynamic = "force-dynamic";

export default function ApiDocs() {
  const uiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!uiRef.current) return;

    SwaggerUI({
      domNode: uiRef.current,
      url: "/openapi.json"
    });
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <div ref={uiRef} />
    </div>
  );
}
