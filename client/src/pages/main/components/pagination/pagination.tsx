import { PageNumber } from './components';
import styled from 'styled-components';
import React, { FC } from 'react';

interface PaginationProps {
	className?: string;
	pages: number[];
	page: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationContainer: FC<PaginationProps> = ({
	className,
	pages,
	page,
	setPage,
}) => {
	const onClick = (clickedPage: number): void => {
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
