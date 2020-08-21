import { createCustomElement } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./styles.scss";
import "@servicenow/now-card";
import "@servicenow/now-icon";

const view = (state, { updateState }) => {
	return (
		<now-card>
			search results for <b>{state.properties.searchText}</b> here
		</now-card>
	);
};

createCustomElement("x-20581-kb-search-results", {
	renderer: { type: snabbdom },
	initialState: {},
	properties: { searchText: { default: "something" } },
	view,
	styles,
});
