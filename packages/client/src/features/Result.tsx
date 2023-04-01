import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getResults } from './result/resultSlice';

function Result() { 
    const dispatch = useAppDispatch();
    dispatch(getResults())
    return (
        <div className="user">
        </div>
    );
}

export default Result;
