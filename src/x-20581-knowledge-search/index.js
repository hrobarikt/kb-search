import { createCustomElement } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./styles.scss";

const view = (state, { updateState }) => {
	return <div>Hello 👋</div>;
};

createCustomElement("x-20581-knowledge-search", {
	renderer: { type: snabbdom },
	view,
	styles,
});
