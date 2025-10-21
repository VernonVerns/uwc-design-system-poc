import { NotificationNew,  UserAvatar } from '@carbon/icons-react'
import { 
	DataTable,
	Table,
	TableHead,
	TableRow,
	TableHeader,
	TableBody,
	TableCell,
	Pagination, 
	Tab, 
	TabList, 
	TabPanel, 
	TabPanels, 
	Tabs, 
} from '@carbon/react'
import applications from '../data/applications.json'
import { useState } from 'react'
import { UWCDataTable, UWCNavbar, UWCProgressBar, UWCScoreCard } from '@uwc/react'


interface Application {
  application_id: string;
  student_name: string;
  program: string;
  program_code: string;
  program_type: string;
  study_type: string;
  faculty: string;
  year_of_study: number;
  submission_date: string;
  status: string;
  comment?: string; // Optional, as it's only present for "Unsuccessful" status
}

const statuses = [
	{label: "In Progress", id: 'inprogress'},
	{label: "Accepted", id: 'accepted'},
	{label: "Unsuccessful", id: 'unsuccessful'},
	{label: "Incomplete", id: 'incomplete'},
];

const headers: { key: keyof Application; header: string }[] = [
	{ key: 'application_id', header: 'Application ID' },
	{ key: 'student_name', header: 'Student Name' },
	{ key: 'program', header: 'Program' },
	{ key: 'program_code', header: 'Program Code' },
	{ key: 'program_type', header: 'Program Type' },
	{ key: 'study_type', header: 'Study Type' },
	{ key: 'faculty', header: 'Faculty' },
	{ key: 'year_of_study', header: 'Year of Study' },
	{ key: 'submission_date', header: 'Submission Date' },
	{ key: 'status', header: 'Status' },
	{ key: 'comment', header: 'Comment' },
];

const facultyQuotas = {
	'Faculty of Science': 30,
	'Faculty of Commerce': 25,
	'Faculty of Humanities': 20,
	'Faculty of Health Sciences': 15,
	'Faculty of Engineering': 10,
	'Faculty of Economics': 18,
};

const DashboardPage: React.FC = () => {
	const [page, setPage] = useState(1);
  	const [pageSize, setPageSize] = useState(5);

	const acceptedApplication = applications.filter((item) => item.status === "Accepted");
	const inProgressApplication = applications.filter((item) => item.status === "In progress");
	const unsuccessfulApplication = applications.filter((item) => item.status === "Unsuccessful");
	const incompleteApplication = applications.filter((item) => item.status === "Incomplete");

	const toRowObject = (application: Application, index: number) => ({
		id: `row-${index}`,
		application_id: application.application_id,
		student_name: application.student_name,
		program: application.program,
		program_code: application.program_code,
		program_type: application.program_type,
		study_type: application.study_type,
		faculty: application.faculty,
		year_of_study: application.year_of_study,
		submission_date: application.submission_date,
		status: application.status,
		comment: application.status === 'Unsuccessful' ? (application.comment ?? '') : '',
	});

	const acceptedRows: { [key: string]: string | number; id: string }[] = acceptedApplication.map(toRowObject);

	const inProgressRows: { [key: string]: string | number; id: string }[] = inProgressApplication.map(toRowObject);

	const unsuccessfulRows: { [key: string]: string | number; id: string }[] = unsuccessfulApplication.map(toRowObject);

	const incompleteRows: { [key: string]: string | number; id: string }[] = incompleteApplication.map(toRowObject);

	const startIndex = (page - 1) * pageSize;
	const endIndex = startIndex + pageSize;

	const paginatedInProgressRows = inProgressRows.slice(startIndex, endIndex);
	const paginatedAcceptedRows = acceptedRows.slice(startIndex, endIndex);
	const paginatedUnsuccessfulRows = unsuccessfulRows.slice(startIndex, endIndex);
	const paginatedIncompleteRows = incompleteRows.slice(startIndex, endIndex);
	
	return (
		<div id='dashboard_page'>
			<UWCNavbar 
				borderBottom
				backgroundColor
				brand={<img src="https://uwc-za.b-cdn.net/files/images/UWC_logo_full-colour-04.svg" style={{width: "160px"}} alt="UWC Logo" />}
				links={[
					{label: "Dashboard", path: '/dashboard'},
					{label: "Applications", path: '/applications'},
					{label: "Course", path: '/courses'},
				]}
				rightIcons={[
					{icon: <NotificationNew size={"20"} />, onClick: () => {}},
					{icon: <UserAvatar size={"20"} />, href: "/account"}
				]}
			/>

			<div className='container'>
				<div className="stats-container">
					<UWCScoreCard 
						label='All Applications'
						value={applications.length}
						borderedCard
						borderRadius
					/>
					<UWCScoreCard
						label='Processing'
						value={inProgressApplication.length + acceptedApplication.length + unsuccessfulApplication.length}
						borderedCard
						borderRadius
					/>
					<UWCScoreCard 
						label='Incomplete'
						value={incompleteApplication.length}
						borderedCard
						borderRadius
						variant='secondary'
					/>
				</div>
				<div className='spacing-10'></div>
				<div className='applications'>
					<h2 className='sub-heading'>Application Status</h2>
					<div className='spacing-08'></div>
					<Tabs onTabCloseRequest={() => {}}>
						<TabList>
							{statuses.map((status) => (
								<Tab key={status.id}>
									{status.label}
								</Tab>
							))}
						</TabList>
						<TabPanels>
							<TabPanel>
								{/* <h4>Tab one</h4> */}
								<UWCDataTable
									title='Applications In Progress'
									description='List of applications that are currently being processed.'
									rows={paginatedInProgressRows}
									headers={headers}
									size="lg"
									stickyHeader={false}
									pageSizeOptions={[5, 20, 50]}
									useZebraStyles={false}
								/>
							</TabPanel>
							<TabPanel>
								<DataTable
									rows={paginatedAcceptedRows}
									headers={headers}
									isSortable
									size="lg"
									render={({ rows, headers, getHeaderProps, getRowProps, getTableProps }) => (
										<Table {...getTableProps()}>
										<TableHead>
											<TableRow>
												{headers.slice(0, -1).map((header) => (
													<TableHeader
													{...getHeaderProps({ header })}
													key={header.key}
													>
													{header.header}
													</TableHeader>
												))}
											</TableRow>
										</TableHead>
										<TableBody>
											{rows.map((row) => (
												<TableRow {...getRowProps({ row })} key={row.id}>
													{row.cells.slice(0, -1).map((cell) => (
													<TableCell key={cell.id}>{cell.value ?? ""}</TableCell>
													))}
												</TableRow>
											))}
										</TableBody>
										</Table>
									)}
								/>
								<Pagination
									page={page}
									pageSize={pageSize}
									pageSizes={[5, 20, 50]}
									totalItems={acceptedRows.length}
									size="lg"
									onChange={({ page, pageSize }) => {
										setPage(page);
										setPageSize(pageSize);
									}}
      							/>
							</TabPanel>
							<TabPanel>
								<DataTable
									rows={paginatedUnsuccessfulRows}
									headers={headers}
									isSortable
									size="lg"
									render={({ rows, headers, getHeaderProps, getRowProps, getTableProps }) => (
										<Table {...getTableProps()}>
											<TableHead>
												<TableRow>
													{headers.map((header) => (
														<TableHeader
														{...getHeaderProps({ header })}
														key={header.key}
														>
														{header.header}
														</TableHeader>
													))}
												</TableRow>
											</TableHead>
											<TableBody>
												{rows.map((row) => (
													<TableRow {...getRowProps({ row })} key={row.id}>
														{row.cells.map((cell) => (
														<TableCell key={cell.id}>{cell.value ?? ""}</TableCell>
														))}
													</TableRow>
												))}
											</TableBody>
										</Table>
									)}
								/>
								<Pagination
									page={page}
									pageSize={pageSize}
									pageSizes={[5, 20, 50]}
									totalItems={unsuccessfulRows.length}
									size="lg"
									onChange={({ page, pageSize }) => {
										setPage(page);
										setPageSize(pageSize);
									}}
	  							/>
							</TabPanel>
							<TabPanel>
								<DataTable
									rows={paginatedIncompleteRows}
									headers={headers}
									isSortable
									size="lg"
									render={({ rows, headers, getHeaderProps, getRowProps, getTableProps }) => (
										<Table {...getTableProps()}>
											<TableHead>
												<TableRow>
												{headers.map((header) => (
													<TableHeader
														{...getHeaderProps({ header })}
														key={header.key}
														>
														{header.header}
													</TableHeader>
												))}
												</TableRow>
											</TableHead>
											<TableBody>
												{rows.map((row) => (
													<TableRow {...getRowProps({ row })} key={row.id}>
														{row.cells.map((cell) => (
														<TableCell key={cell.id}>{cell.value ?? ""}</TableCell>
														))}
													</TableRow>
												))}
											</TableBody>
										</Table>
									)}
								/>
								<Pagination
									page={page}
									pageSize={pageSize}
									pageSizes={[5, 20, 50]}
									totalItems={incompleteRows.length}
									size="lg"
									onChange={({ page, pageSize }) => {
										setPage(page);
										setPageSize(pageSize);
									}}
	  							/>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</div>
				<div className='spacing-10'></div>
				<div className='faculty-progress'>
					<h2 className='sub-heading'>Faculty Progress</h2>
					<div className='spacing-08'></div>
					<div className='progress-bars' >
						{Object.entries(facultyQuotas).map(([faculty, quota]) => {
							const acceptedCount = acceptedApplication.filter(app => app.faculty === faculty).length;
							const progress = Math.min((acceptedCount / quota) * 100, 100);
							return (
								<UWCProgressBar
									key={faculty}
									label={faculty}
									value={progress}
									max={100}
									size='big'
									helperText={`${acceptedCount} of ${quota} Accepted`}
									className='faculty-progress-bar'
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	)
}

export default DashboardPage