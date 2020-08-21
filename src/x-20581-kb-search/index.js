import { createCustomElement } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./styles.scss";
import "@servicenow/now-icon";
import "../x-20581-kb-search-results";

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
			<x-20581-kb-search-results
				searchText={state.searchText}
			></x-20581-kb-search-results>
		</div>
	);
};

createCustomElement("x-20581-kb-search", {
	renderer: { type: snabbdom },
	initialState: { searchText: "email" },
	view,
	styles,
});
