import { useRouter } from 'next/router';
import { useState } from 'react';
import { AdminLayout, AdminMain, AdminSideBar, KeywordControl, UserControl } from '../../components/admin';
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
		<AdminLayout>
			<AdminSideBar title={title} handleClickTab={handleClickTab} />
			<AdminMain title={title} tab={tab}>
				{tab === ADMIN_PAGE_TAB.USER_CONTROL ? <UserControl /> : <KeywordControl />}
			</AdminMain>
		</AdminLayout>
	);
};

export default Admin;
