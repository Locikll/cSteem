import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import tt from 'counterpart';
import * as userActions from 'app/redux/UserReducer';
import { actions as fetchDataSagaActions } from 'app/redux/FetchDataSaga';
import PostSummary from 'app/components/cards/PostSummary';
import { parsePayoutAmount, repLog10 } from 'app/utils/ParsersAndFormatters';
import Post from 'app/components/pages/Post';
import LoadingIndicator from 'app/components/elements/LoadingIndicator';
import debounce from 'lodash.debounce';
import SidebarFilters from 'app/components/elements/SidebarFilters';
import CloseButton from 'react-foundation-components/lib/global/close-button';
import { findParent } from 'app/utils/DomUtils';
import Icon from 'app/components/elements/Icon';
import shouldComponentUpdate from 'app/utils/shouldComponentUpdate';

function topPosition(domElt) {
    if (!domElt) {
        return 0;
    }
    return domElt.offsetTop + topPosition(domElt.offsetParent);
}

class PostsList extends React.Component {
    static propTypes = {
        posts: PropTypes.object.isRequired,
        loading: PropTypes.bool.isRequired,
        category: PropTypes.string,
        loadMore: PropTypes.func,
        showSpam: PropTypes.bool,
        fetchState: PropTypes.func.isRequired,
        pathname: PropTypes.string,
        nsfwPref: PropTypes.string.isRequired,
    };

    static defaultProps = {
        showSpam: false,
        loading: false,
    };

    constructor() {
        super();
        this.state = {
            thumbSize: 'desktop',
            showNegativeComments: false,
        };
        this.scrollListener = this.scrollListener.bind(this);
        this.onBackButton = this.onBackButton.bind(this);
        this.closeOnOutsideClick = this.closeOnOutsideClick.bind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'PostsList');
    }

    componentDidMount() {
        this.attachScrollListener();
    }

    componentWillUnmount() {
        this.detachScrollListener();
        window.removeEventListener('popstate', this.onBackButton);
        window.removeEventListener('keydown', this.onBackButton);
        const post_overlay = document.getElementById('post_overlay');
        if (post_overlay)
            post_overlay.removeEventListener('click', this.closeOnOutsideClick);
        document.getElementsByTagName('body')[0].className = '';
    }

    onBackButton(e) {
        if ('keyCode' in e && e.keyCode !== 27) return;
        window.removeEventListener('popstate', this.onBackButton);
        window.removeEventListener('keydown', this.onBackButton);
    }

    closeOnOutsideClick(e) {
        const inside_post = findParent(e.target, 'PostsList__post_container');
        if (!inside_post) {
            const inside_top_bar = findParent(
                e.target,
                'PostsList__post_top_bar'
            );
            if (!inside_top_bar) {
                const post_overlay = document.getElementById('post_overlay');
                if (post_overlay)
                    post_overlay.removeEventListener(
                        'click',
                        this.closeOnOutsideClick
                    );
                this.closePostModal();
            }
        }
    }

    fetchIfNeeded() {
        this.scrollListener();
    }

    toggleNegativeReplies = () => {
        this.setState({
            showNegativeComments: !this.state.showNegativeComments,
        });
    };

    scrollListener = debounce(() => {
        const el = window.document.getElementById('posts_list');
        if (!el) return;
        const scrollTop =
            window.pageYOffset !== undefined
                ? window.pageYOffset
                : (
                      document.documentElement ||
                      document.body.parentNode ||
                      document.body
                  ).scrollTop;
        if (
            topPosition(el) + el.offsetHeight - scrollTop - window.innerHeight <
            50
        ) {
            const { loadMore, posts, category } = this.props;
            if (loadMore && posts && posts.size)
                loadMore(posts.last(), category);
        }

        // Detect if we're in mobile mode (renders larger preview imgs)
        const mq = window.matchMedia('screen and (max-width: 39.9375em)');
        if (mq.matches) {
            this.setState({ thumbSize: 'mobile' });
        } else {
            this.setState({ thumbSize: 'desktop' });
        }
    }, 50);

    attachScrollListener() {
        window.addEventListener('scroll', this.scrollListener, {
            capture: false,
            passive: true,
        });
        window.addEventListener('resize', this.scrollListener, {
            capture: false,
            passive: true,
        });
        this.scrollListener();
    }

    detachScrollListener() {
        window.removeEventListener('scroll', this.scrollListener);
        window.removeEventListener('resize', this.scrollListener);
    }
    
    render() {
        const {
            posts,
            showSpam,
            loading,
            category,
            content,
            ignore_result,
            account,
            nsfwPref,
        } = this.props;
        const { thumbSize } = this.state;
        const postsInfo = [];
        posts.forEach(item => {
            const cont = content.get(item);
            if (!cont) {
                console.error('PostsList --> Missing cont key', item);
                return;
            }
            

            //Define variables for storing post info
            let reputation;
            let datecreated;
            let postage;
            let wordcount;
            let payout;
            let numvotes;
            
            //Define Filters
            let repmin;
            let repmax;
            let postagemin;
            let postagemax;
            let wordcountmin;
            let wordcountmax;
            let payoutmin;
            let payoutmax;
            let numvotesmin;
            let numvotesmax;
            
            //Defining the boolean where filter blocks content
            let NotThrough;
            let NotThroughCount;

            reputation = repLog10(cont.get('author_reputation'));
            payout = cont.get('pending_payout_value');
            datecreated = cont.get('created');
            
            
            console.log(datecreated);
            
            console.log("Rendering the post list with filters " + JSON.stringify(this.props.filters));
            
            if(this.props.filters) {
                repmin = this.props.filters['repmin'];
                repmax = this.props.filters['repmax'];
                postagemin = this.props.filters['postagemin'];
                postagemax = this.props.filters['postagemax'];  
                wordcountmin = this.props.filters['wordcountmin'];  
                wordcountmax = this.props.filters['wordcountmax'];  
                payoutmin = this.props.filters['payoutmin'];  
                payoutmax = this.props.filters['payoutmax'];  
                numvotesmin = this.props.filters['numvotesmin'];  
                numvotesmax = this.props.filters['numvotesmax'];  
            }
            else {
                repmin = 25;
                repmax = 75;
                postagemin = 30;
                postagemax = 1440;
                wordcountmin = 600;
                wordcountmax = 2200;
                payoutmin = 0.1;
                payoutmax = 10;
                numvotesmin = 1;
                numvotesmax = 100;
            }
            
            
            if(reputation > repmax || reputation < repmin) {
                NotThrough = true;
                
            }
            else {
                NotThrough = false;
            }
            
            
            console.log(reputation);
            
            console.log(repmin);
            console.log(repmax);
            console.log(NotThrough);
            
            console.log(NotThroughCount);
            const ignore =
                ignore_result && (ignore_result.has(cont.get('author')) || NotThrough );
            
            
            console.log(ignore);
            
            const hide = cont.getIn(['stats', 'hide']);
            if (!(ignore || hide) || showSpam)
                // rephide
                postsInfo.push({ item, ignore });
        });
        const renderSummary = items =>
            items.map(item => (
                <li key={item.item}>
                    <PostSummary
                        account={account}
                        post={item.item}
                        thumbSize={thumbSize}
                        ignore={item.ignore}
                        nsfwPref={nsfwPref}
                    />
                </li>
            ));

        return (
            <div id="posts_list" className="PostsList">
                <ul
                    className="PostsList__summaries hfeed"
                    itemScope
                    itemType="http://schema.org/blogPosts"
                >
                    {renderSummary(postsInfo)}
                </ul>
                {loading && (
                    <center>
                        <LoadingIndicator
                            style={{ marginBottom: '2rem' }}
                            type="circle"
                        />
                    </center>
                )}
            </div>
        );
    }
}


export default connect(
    (state, props) => {
        const pathname = state.app.get('location').pathname;
        const current = state.user.get('current');
        const username = current
            ? current.get('username')
            : state.offchain.get('account');
        const content = state.global.get('content');
        const ignore_result = state.global.getIn([
            'follow',
            'getFollowingAsync',
            username,
            'ignore_result',
        ]);
        const userPreferences = state.app.get('user_preferences').toJS();
        const nsfwPref = userPreferences.nsfwPref || 'warn';
        return {
            ...props,
            username,
            content,
            ignore_result,
            pathname,
            nsfwPref,
        };
    },
    dispatch => ({
        fetchState: pathname => {
            dispatch(fetchDataSagaActions.fetchState({ pathname }));
        },
        removeHighSecurityKeys: () => {
            dispatch(userActions.removeHighSecurityKeys());
        },
    })
)(PostsList);
