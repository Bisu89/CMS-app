import React, {useEffect, useState} from "react";
import {Link, withRouter} from 'react-router-dom'
import * as queryString from 'query-string'
import './style.css'

export const PAGE_SIZE_HOTEL_CONFIG = 10

function Pagination({page, pageSize, numberPageDisplay, Total, location}) {
    const [prevLink, setPrevLink] = useState(null)
    const [nextLink, setNextLink] = useState(null)
    const [pages, setPages] = useState([])
    const [count, setCount] = useState({})

    useEffect(() => {
        if (Total) {
            const total_page = Math.ceil(Total / (pageSize || PAGE_SIZE_HOTEL_CONFIG))
            const query = queryString.parse(location.search)
            const current_page = Number(page) || Number(query.page) || 1
            const n =
                total_page < (numberPageDisplay)
                    ? total_page
                    : numberPageDisplay
            const a = []
            const range = Math.round(n / 2) - 1
            const start = current_page - range > 1 ? current_page - range : 1
            const end = start + n - 1 < total_page ? start + n - 1 : total_page
            for (let i = start; i <= end; i++) {
                const link = location.pathname + '?' + queryString.stringify({...query, page: i})
                if (i >= 1 && i <= total_page) {
                    a.push({
                        active: i === current_page,
                        page: i,
                        link
                    })
                }
            }
            setPages(a)
            const queryNext = {...query, page: current_page + 1}
            const queryPrev = {
                ...query,
                page: current_page > 1 ? current_page - 1 : ''
            }
            setPrevLink({
                link: location.pathname + '?' + queryString.stringify(queryPrev),
                is_disable: current_page === 1
            })
            setNextLink({
                link: location.pathname + '?' + queryString.stringify(queryNext),
                is_disable: current_page === total_page
            })
            const startCount = (page - 1) * pageSize + 1;
            const endCount = page * pageSize > Total ? Total : page * pageSize;
            setCount({
                startCount,
                endCount
            })
        }
    }, [location, page, pageSize, Total, numberPageDisplay])
    return (
        <div className="pagination">
            {Total ? (
                <div className="count-text__paging">
                    Hiển thị
                    từ {count.startCount + ' đến ' + (count.endCount || '?') + ' trong tổng số ' + (Total || '?')}
                </div>
            ) : ''}
            {prevLink && (
                <Link to={prevLink.link} className={`pagination__item first ${prevLink.is_disable ? 'disabled' : ''}`}>
                    Trước
                </Link>
            )}
            {pages.map(item => {
                return (
                    <Link to={item.link} className={`pagination__item ${item.active ? 'active' : ''}`}
                          key={`page-${item.page}`}>
                        {item.page}
                    </Link>
                )
            })}
            {nextLink && (
                <Link to={nextLink.link} className={`pagination__item ${nextLink.is_disable ? 'disabled' : ''}`}>
                    Tiếp theo
                </Link>
            )}
        </div>

    )
}

export default withRouter(Pagination)
