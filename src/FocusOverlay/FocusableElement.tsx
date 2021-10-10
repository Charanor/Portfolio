import React, { PropsWithChildren } from "react";
import { View } from "react-native";

export type FocusableElementProps = PropsWithChildren<{
	// This id will be UNUSED in the code. It is only here so we can check for it later
	// when we search for this element.
	/** The id used by the FocusOverlay to find this element. */
	id: string;
}>;

const FocusableElement = React.forwardRef<View, FocusableElementProps>(({ children }, ref) => {
	return (
		<View collapsable={false} {...{ ref }}>
			{children}
		</View>
	);
});

export default FocusableElement;
