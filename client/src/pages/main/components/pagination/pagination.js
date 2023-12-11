import { PageNumber } from './components';
import styled from 'styled-components';

const PaginationContainer = ({ className, pages, page, setPage }) => {
	const onClick = clickedPage => {
		if (clickedPage === page) return;

		setPage(clickedPage);
	};

	return (
		<div className={className}>
			<div className="pagination">
				{pages.map((number, index) => (
					<PageNumber
						key={index}
						number={number}
						isActive={number === page}
						onClick={() => onClick(number)}
					/>
				))}
			</div>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;

	& .pagination {
		display: flex;
		border: 2px solid #000;
		border-radius: 8px;
	}
`;
