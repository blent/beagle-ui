import React from 'react';
import {
    Toolbar,
    ToolbarGroup
} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import map from 'lodash/map';
import DynamicEventsMixin from '../../mixins/dynamic-events-mixin';
import {
    button as buttonCss,
    hyphen as hyphenCss,
    current as currentCss
} from './pager.css';

export default React.createClass({
    propTypes: {
        className: React.PropTypes.string,
        currentPage: React.PropTypes.number,
        perPage: React.PropTypes.number,
        total: React.PropTypes.number,
        onGotoPage: React.PropTypes.func,
        onPrev: React.PropTypes.func,
        onNext: React.PropTypes.func
    },

    mixins: [
        PureRenderMixin,
        DynamicEventsMixin
    ],

    getDefaultProps() {
        return {
            currentPage: 1,
            perPage: 10,
            total: 0
        };
    },

    _numPages() {
        return Math.ceil(this.props.total / this.props.perPage) || 1;
    },

    _pageRange() {
        const input = [];
        const { currentPage } = this.props;

        if (isNaN(currentPage)) return input;

        const nbPages = this._numPages();

        // display page links around the current page
        if (currentPage > 2) {
            input.push('1');
        }
        if (currentPage === 4) {
            input.push('2');
        }
        if (currentPage > 4) {
            input.push('.');
        }
        if (currentPage > 1) {
            input.push(currentPage - 1);
        }
        input.push(currentPage);
        if (currentPage < nbPages) {
            input.push(currentPage + 1);
        }
        if (currentPage === (nbPages - 3)) {
            input.push(nbPages - 1);
        }
        if (currentPage < (nbPages - 3)) {
            input.push('.');
        }
        if (currentPage < (nbPages - 1)) {
            input.push(nbPages);
        }

        return input;
    },

    _renderPreviousButton() {
        if (this.props.currentPage > 1) {
            return (
                <FlatButton
                    primary
                    key="prev"
                    label="Previous"
                    className={buttonCss}
                    icon={<ChevronLeft />}
                    onClick={this.props.onPrev}
                />
            );
        }

        return null;
    },

    _renderNextButton() {
        if (this.props.currentPage <= this._numPages()) {
            return (
                <FlatButton
                    primary
                    key="next"
                    label="Next"
                    className={buttonCss}
                    icon={<ChevronRight />}
                    labelPosition="before"
                    onClick={this.props.onNext}
                />
            );
        }

        return null;
    },

    _renderPageNums() {
        return map(this._pageRange(), (pageNum, index) => {
            if (pageNum === '.') {
                return (
                    <span
                        key={`hyphen_${index}`}
                        className={hyphenCss}
                    >
                        &hellip;
                    </span>
                );
            }

            return (
                <FlatButton
                    key={pageNum}
                    label={pageNum}
                    className={buttonCss}
                    data-page={pageNum}
                    onClick={this.props.onGotoPage}
                    primary={pageNum !== this.props.currentPage}
                />
            );
        });
    },

    _renderCurrentPage() {
        return (
            <span
                className={currentCss}
            >
                {`${this.currentPage} of ${this._numPages()}`}
            </span>
        );
    },

    render() {
        return (
            <Toolbar
                className={this.props.className}
            >
                <ToolbarGroup firstChild>
                    {this._renderCurrentPage()}
                </ToolbarGroup>
                <ToolbarGroup>
                    {this._renderPreviousButton()}
                    {this._renderPageNums()}
                    {this._renderNextButton()}
                </ToolbarGroup>
            </Toolbar>
        );
    }
});
