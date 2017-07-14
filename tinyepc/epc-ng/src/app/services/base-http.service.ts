import {Injectable, ViewContainerRef} from '@angular/core';
import {Http, Request, Response, RequestMethod, RequestOptionsArgs, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';

import {LoadingService} from './loading.service';

const dataTypeMap = {
    XML: 'xml',
    HTML: 'html',
    SCRIPT: 'script',
    JSON: 'json',
    JSONP: 'jsonp',
    TEXT: 'text'
};

@Injectable()
export class BaseHttpService {

    protected dataType: string = dataTypeMap.JSON;
    protected isShowLoading: boolean = true;
    private viewContainer: ViewContainerRef = null;

    constructor(
        protected http: Http,
        protected loadingService: LoadingService
    ) {
    }

    protected request(url: string, options: RequestOptionsArgs): Observable<any> {

        let requestOptions = new RequestOptions(options);

        requestOptions.url = url;

        requestOptions = this.beforeRequest(requestOptions) || requestOptions;
        let observable: Observable<Response> = this.http.request(new Request(requestOptions));

        if (this.dataType === dataTypeMap.JSON) {

            return observable
                .map(res => {
                    this.afterResponse(res, requestOptions);
                    return res.json();
                })
                .catch(this.errorHandler);
        } else {

            return observable.catch(this.errorHandler);
        }
    }

    protected get(url: string, options: RequestOptionsArgs = {}, body: any = null): Observable<any> {

        options.method = RequestMethod.Get;
        options.body = body;

        return this.request(url, options);
    }

    protected post(url: string, options: RequestOptionsArgs = {}, body: any = null): Observable<any> {

        options.method = RequestMethod.Post;
        options.body = body;

        return this.request(url, options);
    }

    protected put(url: string, options: RequestOptionsArgs = {}, body: any = null): Observable<any> {

        options.method = RequestMethod.Put;
        options.body = body;

        return this.request(url, options);
    }

    protected delete(url: string, options: RequestOptionsArgs = {}, body: any = null): Observable<any> {

        options.method = RequestMethod.Delete;
        options.body = body;

        return this.request(url, options);
    }

    protected beforeRequest(requestOptions: RequestOptions): RequestOptions {

        if (this.isShowLoading && this.viewContainer) {

            this.loadingService.show(this.viewContainer);
        }

        return requestOptions;
    }

    protected afterResponse(res: Response, requestOptions?: RequestOptions): void {

        if (this.viewContainer) {
            this.loadingService.hide();
            this.viewContainer = null;
        }
    }

    protected setViewContainer(viewContainer: ViewContainerRef) {

        this.viewContainer = viewContainer;
    }

    protected errorHandler(res: Observable<any>): Observable<any> {

        console.log(res);

        return res;
    }
}
