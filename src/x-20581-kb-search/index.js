import { createCustomElement } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./styles.scss";
import "@servicenow/now-card";
import "@servicenow/now-icon";

const view = (state, { updateState }) => {
	return (
		<div>
			<header>
				<now-icon icon="magnifying-glass-outline"></now-icon>
				<input
					value={state.searchText}
					on-input={(e) => updateState({ searchText: e.target.value })}
				/>
			</header>

			<now-card>
				search results for <b>{state.searchText}</b> here
			</now-card>
		</div>
	);
};

createCustomElement("x-20581-kb-search", {
	renderer: { type: snabbdom },
	initialState: { searchText: "email" },
	view,
	styles,
});
