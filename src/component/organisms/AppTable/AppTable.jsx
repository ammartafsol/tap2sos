import TableSkeleton from "@/component/atoms/TableSkeleton";
import classes from "./AppTable.module.css";
import {  getNestedObject, mergeClass } from "@/resources/utils/helper";
import { RECORDS_LIMIT } from "@/const";
import NoDataFound from "@/component/atoms/NoDataFound/NoDataFound";
import Pagination from "@/component/molecules/PaginationComponent";
import PropTypes from "prop-types";

const AppTable = ({
  data = [],
  loading = false,
  tableHeader = [],
  noDataText = "",
  renderItem = null,
  renderTableHeader = null,
  hasPagination = true,
  containerClass,
  ...props
}) => {
  return (
    <>
      <div
        className={mergeClass(
          classes?.tableMainContainer,
          containerClass
        )}
      >
        <div className={mergeClass(`${classes?.tableHeaderContainer}`)}>
          <table>
            <thead>
              <tr>
                {tableHeader?.map((item) => {
                  const headerKey =
                    item?.key ?? item?.title ?? crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);

                  return (
                  <th
                    key={headerKey}
                    style={{
                      textAlign: "left",
                      ...(item?.style ? item.style : undefined),
                    }}
                  >
                    {renderTableHeader
                      ? renderTableHeader({ item })
                      : item?.title}
                  </th>
                  );
                })}
              </tr>
            </thead>
          </table>
        </div>
        {loading ? (
          <TableSkeleton
            rowsCount={RECORDS_LIMIT}
            colsCount={tableHeader.length}
          />
        ) : (
          <div className={mergeClass(`${classes?.tableBodyContainer}`)}>
            {data?.length > 0 ? (
              <table>
                <tbody>
                  {data?.map((item, rowIndex) => {
                    const rowKey =
                      item?._id ??
                      item?.id ??
                      item?.slug ??
                      item?.email ??
                      item?.key ??
                      item?.name ??
                      item?.title ??
                      crypto?.randomUUID?.() ??
                      Math.random().toString(36).slice(2);
                    return (
                      <tr key={rowKey}>
                        {tableHeader.map(({ key, style, title }) => {
                          let __item = getNestedObject(item, key);
                          const cellKey = `${rowKey}-${key ?? title}`;

                          return (
                            <td
                            className={classes.text}
                              key={cellKey}
                              style={{
                                textAlign: "left",
                                ...style,
                              }}
                            >
                              {renderItem
                                ? renderItem({
                                    item: __item,
                                    key,
                                    title,
                                    data,
                                    rowIndex,
                                  })
                                : __item}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <NoDataFound style={classes?.noData} text={noDataText} />
            )}
          </div>
        )}
      </div>
      {hasPagination && (
        <Pagination
          {...props}
        />
      )}
    </>
  );
};

AppTable.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  tableHeader: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
      style: PropTypes.object,
    })
  ),
  noDataText: PropTypes.string,
  renderItem: PropTypes.func,
  renderTableHeader: PropTypes.func,
  hasPagination: PropTypes.bool,
  containerClass: PropTypes.string,
};

export default AppTable;
