import { debounce } from "lodash";
import { createCustomElement, actionTypes } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import { createHttpEffect } from "@servicenow/ui-effect-http";
import styles from "./styles.scss";
import "@servicenow/now-card";
import "@servicenow/now-loader";
import "@servicenow/now-modal";
import "@servicenow/now-rich-text";

const requestSearchResults = ({ properties, dispatch }) => {
	if (properties.searchText) {
		dispatch("SEARCH_RESULTS_REQUESTED", {
			table: "kb_knowledge",
			sysparm_query: `short_descriptionLIKE${properties.searchText}`,
		});
	}
};

const view = (state, { updateState }) => {
	return (
		<now-card>
			{state.showLoading ? (
				<now-loader></now-loader>
			) : (
				<ul>
					{state.searchResults.length ? (
						state.searchResults.map((result) => (
							<li>
								<now-button-iconic
									bare
									icon="circle-info-outline"
									size="md"
									on-click={() => updateState({ selectedResult: result })}
								></now-button-iconic>
								{result.short_description}
							</li>
						))
					) : (
						<li>No matches found</li>
					)}
				</ul>
			)}
			{state.selectedResult ? (
				<now-modal
					opened={state.selectedResult}
					size="lg"
					footerActions={[
						{
							label: "Done",
							variant: "secondary",
							clickActionType: "NOW_MODAL#OPENED_SET",
						},
					]}
				>
					<now-rich-text html={state.selectedResult.text}></now-rich-text>
				</now-modal>
			) : null}
		</now-card>
	);
};

createCustomElement("x-20581-kb-search-results", {
	renderer: { type: snabbdom },
	initialState: {
		showLoading: true,
		searchResults: [],
		selectedResult: null,
	},
	properties: { searchText: { default: "something" } },
	view,
	actionHandlers: {
		[actionTypes.COMPONENT_CONNECTED]: requestSearchResults,
		[actionTypes.COMPONENT_PROPERTY_CHANGED]: debounce(
			requestSearchResults,
			250
		),
		SEARCH_RESULTS_REQUESTED: createHttpEffect("/api/now/table/:table", {
			pathParams: ["table"],
			queryParams: ["sysparm_query"],
			startActionType: "SEARCH_RESULTS_STARTED",
			successActionType: "SEARCH_RESULTS_FETCHED",
		}),
		SEARCH_RESULTS_STARTED: ({ updateState }) =>
			updateState({ showLoading: true }),
		SEARCH_RESULTS_FETCHED: ({ action, updateState }) =>
			updateState({ searchResults: action.payload.result, showLoading: false }),
	},
	styles,
});
