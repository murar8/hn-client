import { ChakraProvider } from "@chakra-ui/react";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import { match as matchMediaQuery } from "css-mediaquery";
import { createMemoryHistory, MemoryHistoryBuildOptions } from "history";
import { ComponentType, ReactElement } from "react";
import { Router } from "react-router-dom";

export type Payload = { [key: string]: unknown };
export type Wrapper<P extends Payload> = { Component: ComponentType; payload?: P };
export type RenderFunction<P extends RenderResult> = (ui: ReactElement, options?: RenderOptions) => P;

export class Renderer<R extends RenderResult> {
  private constructor(public render: RenderFunction<R>) {}

  static create(): Renderer<RenderResult> {
    return new Renderer(render);
  }

  wrap<P extends Payload>({ Component, payload }: Wrapper<P>): Renderer<P extends Payload ? R & P : R> {
    return new Renderer((ui, options) => {
      const result = this.render(ui, {
        ...options,
        wrapper: ({ children }) => (
          <Component>{options?.wrapper ? <options.wrapper>{children}</options.wrapper> : children}</Component>
        ),
      });

      return (payload !== undefined ? { ...result, ...payload } : result) as P extends Payload ? R & P : R;
    });
  }

  withRouter(options?: MemoryHistoryBuildOptions) {
    const history = createMemoryHistory(options);
    return this.wrap({ Component: (props) => <Router history={history} {...props} />, payload: { history } });
  }

  withChakraProvider() {
    return this.wrap({ Component: (props) => <ChakraProvider {...props} /> });
  }
}

export function mockMatchMedia(screenWidth: number) {
  window.matchMedia = (query: string) => ({
    matches: matchMediaQuery(query, { width: screenWidth }),
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}
