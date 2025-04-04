import TableSkeleton from "@/component/atoms/TableSkeleton";
import classes from "./AppTable.module.css";
import {  getNestedObject, mergeClass } from "@/resources/utils/helper";
import { RECORDS_LIMIT } from "@/const";
import NoDataFound from "@/component/atoms/NoDataFound/NoDataFound";
import Pagination from "@/component/molecules/PaginationComponent";
// import { NoData } from "@/component/atoms/NoData/NoData";

export default function AppTable({
  data = [],
  loading = false,
  tableHeader = [],
  noDataText = "",
  renderItem = null,
  renderTableHeader = null,
  hasPagination = true,
  containerClass,
  ...props
}) {
  return (
    <>
      <div
        className={mergeClass(
          classes?.tableMainContainer,
          containerClass && containerClass
        )}
      >
        <div className={mergeClass(`${classes?.tableHeaderContainer}`)}>
          <table>
            <thead>
              <tr>
                {tableHeader?.map((item, index) => (
                  <th
                    key={index}
                    style={{
                      textAlign: "left",
                      ...(item.style && item.style),
                    }}
                  >
                    {renderTableHeader
                      ? renderTableHeader({ item: item, index })
                      : item?.title}
                  </th>
                ))}
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
                    return (
                      <tr key={rowIndex}>
                        {tableHeader.map(({ key, style, title }, colIndex) => {
                          let __item = getNestedObject(item, key);

                          return (
                            <td
                            className={classes.text}
                              key={colIndex}
                              style={{
                                textAlign: "left",
                                ...style,
                              }}
                            >
                              {renderItem
                                ? renderItem({
                                    item: __item,
                                    colIndex,
                                    rowIndex,
                                    key,
                                    title,
                                    data
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
          // totalRecords={totalRecords}
          // currentPage={pages}
          // setCurrentPage={setPages}
        />
      )}
    </>
  );
}
