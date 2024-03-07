export interface IModal {
	isOpen?: boolean;
	text?: string;
	onConfirm?: () => void;
	onCancel?: () => void;
	isError?: boolean;
}
