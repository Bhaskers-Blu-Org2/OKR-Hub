import * as React from "react";
import { SampleDataPage } from "./SampleDataPage";
import { DetailViewMenu } from "./DetailView/DetailViewMenu";
import { AreaView } from "./AreaView/AreaView";
import * as SDK from "azure-devops-extension-sdk";
import { StateProvider, useStateValue } from './StateMangement/StateProvider';
import { Button } from "azure-devops-ui/Button";
import { NavigationConstants } from "./OKRConstants";

export class OKRMain extends React.Component<{}, {}> {
    public componentDidMount() {
        SDK.init();
    }

    public render(): JSX.Element {
        return (
            <StateProvider>
                <div className="okrhub">
                    <OKRPage />
                </div>
            </StateProvider>
        );
    }
}

const OKRPage: React.SFC<{}> = props => {
    const stateContext = useStateValue();
    // Make sure to initialize the objectives and areas
    React.useEffect(() => {
        if (!stateContext.state.objectives) {
            stateContext.actions.getObjectives({});
        }
        if (!stateContext.state.areas) {
            stateContext.actions.getAreas({});
        }
        if (!stateContext.state.projectName) {
            stateContext.actions.getProjectName({});
        }
    });
    

    let okrPage;

    switch (stateContext.state.pageLocation) {
        case NavigationConstants.AreaView:
            return <AreaView />;
        case NavigationConstants.DetailView:
            return <DetailViewMenu />;
        case NavigationConstants.Data:
            return <SampleDataPage />;
    }
};