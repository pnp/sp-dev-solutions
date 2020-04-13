import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { List } from 'office-ui-fabric-react/lib/List';
import LinkPickerPanel from '../../../common/components/LinkPickerPanel/LinkPickerPanel';
import { LinkType } from '../../../common/components/LinkPickerPanel/ILinkPickerPanelProps';
import { IMap, IRoute, Route, ILanguage } from '../../../common/models/Models';
import styles from './MultilingualRedirector.module.scss';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { IconButton } from 'office-ui-fabric-react/lib/Button';

export interface IRouteListProps {
    label: string;
    loadLanguages: () => Promise<Array<ILanguage>>;
    map: IMap;
    onChanged: (map: IMap) => void;
    context: WebPartContext;
    stateKey: string;
}

export interface IRouteListState {
    languages: Array<ILanguage>;
    map: IMap;
    stateKey: string;
}

export class RouteList extends React.Component<IRouteListProps, IRouteListState> {

    private linkPickerPanel: LinkPickerPanel;

    constructor(props: IRouteListProps) {
        super(props);
        this.onRenderCell = this.onRenderCell.bind(this);
        this.state = {
            languages: [],
            map: this.props.map,
            stateKey: this.props.stateKey
        };
    }

    public componentDidMount(): void {

        this.props.loadLanguages().then((languages: Array<ILanguage>) => {

            //load the supported languages
            let majorLanguages: Array<ILanguage> = [];
            let tempRoutes: Array<IRoute> = this.props.map.routes;
            let majorRoutes: Array<IRoute> = [];
            for (let l: number = 0; l < languages.length; l++) {

                //get the supported major languages
                majorLanguages.push({
                    code: languages[l].code.split('-')[0],
                    description: languages[l].description
                });

                //ensure the map has a route for each major language
                //(in case one is added to the map file)
                let routeExists: boolean = false;
                for (let r: number = 0; r < tempRoutes.length; r++) {
                    if (tempRoutes[r].language == majorLanguages[l].description) {
                        routeExists = true;
                        break;
                    }
                }

                //add an empty route to the map, if necessary
                if (!routeExists) {
                    tempRoutes.push(new Route(
                        majorLanguages[l].code,
                        majorLanguages[l].description,
                        "{not set}"));
                }

            }

            //make sure there are no orphaned routes
            //(in case one is removed from the map file)
            let languageExists: boolean = false;
            for (let r: number = 0; r < tempRoutes.length; r++) {
                for (let l: number = 0; l < majorLanguages.length; l++) {
                    if (tempRoutes[r].language == majorLanguages[l].description) {
                        languageExists = true;
                        break;
                    }
                }
                if (languageExists) {
                    majorRoutes.push(tempRoutes[r]);
                }
            }

            //save the sync'd languages and routes
            this.setState({
                languages: JSON.parse(JSON.stringify(majorLanguages)),
                map: { routes: JSON.parse(JSON.stringify(majorRoutes)) }
            });

        });
    }

    public render(): React.ReactElement<IRouteListProps> {

        return (
            <div className={styles.multilingualRedirector}>
                <LinkPickerPanel
                    webAbsUrl={this.props.context.pageContext.web.absoluteUrl}
                    webPartContext={this.props.context}
                    linkType={LinkType.any}
                    ref={(ref) => { this.linkPickerPanel = ref; }}
                />
                <div>
                    <div data-is-scrollable="true">
                        <List
                            renderedWindowsAhead={2}
                            items={this.state.map.routes}
                            onRenderCell={this.onRenderCell}
                        />
                    </div>
                </div>
            </div>);
    }

    private onRenderCell = (item: any, index: number | undefined): JSX.Element => {
        let route: IRoute = item as Route;

        return (
            <div className={styles.propLanguage}>
                <TextField className={styles.propLangValue} label={route.language} placeholder="Not Set" multiline={(route.destination.length > 38)?true:false} value={(route.destination === '{not set}')?"":route.destination} />
                <IconButton className={styles.propLangButton} disabled={false} iconProps={{ iconName: 'MiniLink' }} title="Link to Page" ariaLabel="LinkPage" onClick={() => this.onRouteChanged(route.language)} />
            </div>
        );
    }

    private onRouteChanged = (language: string): void => {
        var that = this;
        let routes = JSON.parse(JSON.stringify(this.state.map.routes));

        this.linkPickerPanel.pickLink().then((link) => {

            for (let l: number = 0; l < routes.length; l++) {
                if (routes[l].language == language) {
                    routes[l].destination = link.url;
                }
            }

            console.log("Route List changed!");
            console.log({ routes: routes });
            that.props.onChanged({ routes: routes });
            that.setState({ map: { routes: routes } });

        }).catch(() => {
            console.log("Nothing picked!");
        });
    }

}  