import { useRouter } from 'next/router';
import { useState } from 'react';
import { AdminMainLayout, KeywordControl, UserControl } from '../../components/admin';
import { ADMIN_PAGE_TAB } from '../../constants/constants';

const Admin = () => {
	const router = useRouter();
	const { id } = router.query;
	const [tab, setTab] = useState(0);
	const [title, setTitle] = useState('부스트캠프 7기 커뮤니티');

	const handleClickTab = (tabData: number) => {
		setTab(tabData);
	};

	return (
		<div>
			<aside>
				<h2>{title}</h2>
				<ul>
					<li
						onClick={() => {
							handleClickTab(ADMIN_PAGE_TAB.USER_CONTROL);
						}}
					>
						유저 관리
					</li>
					<li
						onClick={() => {
							handleClickTab(ADMIN_PAGE_TAB.KEYWORD_CONTROL);
						}}
					>
						키워드 관리
					</li>
				</ul>
			</aside>
			<AdminMainLayout title={title} tab={tab}>
				{tab === 0 ? <UserControl /> : <KeywordControl />}
			</AdminMainLayout>
		</div>
	);
};

export default Admin;
