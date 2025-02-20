import { Input } from "@pulumi/pulumi";

export module Warp {
  export interface Definition {
    functionID: string;
    runtime: string;
    properties: any;
    handler: string;
    bundle?: string;
    links: string[];
  }
  let warps: Record<string, Definition> = {};
  export function reset() {
    warps = {};
  }

  export function list() {
    return warps;
  }

  export function register(definition: Definition) {
    warps[definition.functionID] = definition;
  }
}
