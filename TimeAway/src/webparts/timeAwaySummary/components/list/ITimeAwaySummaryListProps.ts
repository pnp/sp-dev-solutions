import { ITimeAwaySummaryDataProvider } from '../../dataProviders/ITimeAwaySummaryDataProvider';
import {
    WeekType, Phase
} from '../../../../libraries/index';

interface ITimeAwaySummaryListProps {
    weekType: WeekType;
    phase: Phase;
    dataProvider: ITimeAwaySummaryDataProvider;
    statusFilter: boolean;
}

export default ITimeAwaySummaryListProps;