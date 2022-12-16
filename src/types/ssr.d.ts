import {ParsedUrlQuery} from 'querystring';
import {GetServerSideProps} from 'next';

declare global {
    type AppServerSideProps<T = AnyObject, Q = ParsedUrlQuery> = GetServerSideProps<T, Q>;
}
