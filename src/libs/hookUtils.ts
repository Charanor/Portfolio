import React, { useEffect } from "react";

/**
 * A hook that acts as useEffect, but it only runs its callback when the component is first mounted.
 * Equivalent to `React.useEffect(effectCallback, [])`.
 * @param effectCallback the callback to run when the effect fires
 */
export function useMountEffect(effectCallback: React.EffectCallback) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(effectCallback, []);
}

/**
 * A hook that acts as useEffect, but it only runs its callback when the component is unmounted.
 * Equivalent to `React.useEffect(() => effectCallback, [])`.
 * @param effectCallback the callback to run when the effect fires
 */
export function useUnmountEffect(effectCallback: () => void) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => effectCallback, []);
}
