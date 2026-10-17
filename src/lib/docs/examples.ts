// The context a component page hands its examples through, so a machine demo's
// <Example> blocks can print the code that renders them.
import type { Component } from 'svelte';

export const EXAMPLES = Symbol('component examples');
export type CodeSample = { code: string; html: string };
export type ExampleContext = { samples: CodeSample[]; next: number };

/** A pre-highlighted code block: the raw text and its HTML. */
export type Code = { code: string; html: string };

export type DemoLoader = () => Promise<{ default: Component }>;
