declare interface NodeModule {
	hot: {
		accept(callback: () => void): void;
		accept(path: string, callback?: () => void): void;
	};
}
