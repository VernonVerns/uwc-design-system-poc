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
import { UWCButton, UWCDataTable, UWCNavbar, UWCProgressBar, UWCScoreCard, UWCTextInput } from '@uwc/react'
import NavigationBar from '../components/UWCNavbar'
import { useToast } from '../components/ToastProvider'
import { UWCCard } from '../components/UWCCard'
import { UWCModal } from '../components/UWCModal'
import {TextArea, Select, SelectItem } from '@carbon/react'
import { UWCPasswordInput } from '../components/UWCPasswordInput'
import { UWCTextArea } from '../components/UWCTextArea'
import { UWCAccordion } from '../components/UWCAccordion'
import { UWCPagination } from '../components/UWCPagination'
import { UWCProgressIndicator } from '../components/UWCProgressIndicator'
import UWCLoader from '../components/UWCLoader'
import { UWCAvatar } from '../components/UWCAvatar'
import { UWCBanner } from '../components/UWCBanner'
import slideVideo from '../assets/campus.mp4'
import slideImage from '../assets/gradutionImg.jpg'
import slideImage2 from '../assets/image2.jpg'

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
	const [modal1Open, setModal1Open] = useState(false);
	const [modal2Open, setModal2Open] = useState(false);
	const [modal3Open, setModal3Open] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		status: "active",
	});
	const [comments, setComments] = useState("");

	const handleChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = () => {
		console.log("Project submitted:", formData);
		setModal3Open(false);
	};

	const [openItems, setOpenItems] = useState<string[]>(["item-1"]);

	const handleToggle = (id: string, isOpen: boolean) => {
		setOpenItems((prev) =>
			isOpen ? [...prev, id] : prev.filter((item) => item !== id)
		);
	};

	const items = [
		{
			id: "item-1",
			title: "What is Carbon Design System?",
			content: (
				<p>
				Carbon is IBM’s open-source design system for digital products and experiences. 
				It provides components, patterns, and guidelines for consistent, accessible design.
				</p>
			),
		},
		{
			id: "item-2",
			title: "Can I use it with React?",
			content: (
				<p>
				Absolutely. Carbon React provides fully accessible, production-ready React components 
				aligned with the design system.
				</p>
			),
		},
		{
			id: "item-3",
			title: "Is it customizable?",
			content: (
				<ul>
				<li>You can override tokens for color and spacing.</li>
				<li>Carbon supports theming with CSS variables.</li>
				<li>Each component can be styled to match your brand.</li>
				</ul>
			),
		},
	];

	const acceptedApplication = applications.filter((item) => item.status === "Accepted");
	const inProgressApplication = applications.filter((item) => item.status === "In progress");
	const unsuccessfulApplication = applications.filter((item) => item.status === "Unsuccessful");
	const incompleteApplication = applications.filter((item) => item.status === "Incomplete");

	const { showToast } = useToast();

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
			{/* <UWCNavbar 
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
			/> */}

			{/* <UWCLoader glassy kind='primary' /> */}

			<NavigationBar 
				backgroundColor
				links={[
					{label: "Apply", path: '/'},
					{label: "Visit", path: '/visit'},
					{label: "Majors & Minors", path: '/majors-minors'},
				]}
				brand={<img src="https://uwc-za.b-cdn.net/files/images/UWC-2025-trilingual-landscape.svg" alt="UWC Logo" />}
				search={{
					data: [
						// make the discription to be 2 lines max
						{ 
							title: "Admissions", 
							desc: "Explore comprehensive admission processes, application requirements, and deadlines. Find guidance on program selection and submission procedures for both undergraduate and postgraduate studies.",
							link: "/admissions"
						},
						{ 
							title: "Departments", 
							desc: "Browse departments and their programs. Find your academic home at UWC. Explore diverse fields of study and connect with faculty. Discover opportunities for growth and excellence. Join a vibrant academic community.", 
							link: "/departments"
						},
						{ 
							title: "Research", 
							desc: "Explore groundbreaking research and innovation. Join our research community. Discover projects shaping the future across diverse fields at UWC. Collaborate and innovate with us. Be part of transformative research.", 
							link: "/research"
						},
					],
				}}
				mainMenu={[
					{
						label: "Becoming a Student",
						onClick: () => {},
						subLinks: [
							{label: "About UWC", path: "/about-uwc"},
							{label: "Admissions", path: "/admissions"},
							{label: "Apply", path: "/apply"},
							{label: "Athletics", path: "/athletics"},
							{label: "Financial Aid", path: "/financial-aid"},
							{label: "Develop Your Career", path: "/develop-your-career"},
							{label: "Campus Life", path: "/campus-life"},
							{label: "Majors & Minors", path: "/majors-minors"},
							{label: "Student Organizations", path: "/student-organizations"},
							{label: "International Students", path: "/international-students"},
							{label: "Visit UWC", path: "/visit-uwc"},
						]
					},
					{
						label: "Current Students",
						onClick: () => {},
						subLinks: [
							{label: "Academic Advising", path: "/academic-advising"},
							{label: "Academics", path: "/academics"},
							{label: "Billing & Payments", path: "/billing-payments"},
							{label: "Develop Your Career", path: "/develop-your-career"},
							{label: "Library & ICS", path: "/library-ics"},
							{label: "MyUWC", path: "/my-uwc"},
							{label: "Registrar's Office", path: "/registrars-office"},
							{label: "Resources & Tools", path: "/resources-tools"},
							{label: "Safety & Security", path: "/safety-security"},
							{label: "Financial Aid", path: "/financial-aid"},
							{label: "Student Life", path: "/student-life"},
							{label: "International Students", path: "/international-students"},
						]
					},
					{
						label: "Parents & Families",
						onClick: () => {},
						subLinks: [
							{label: "Parent Homepage", path: "/parent-homepage"},
							{label: "Admissions", path: "/admissions"},
							{label: "Billing & Payments", path: "/billing-payments"},
							{label: "Safety & Security", path: "/safety-security"},
							{label: "Campus Life", path: "/campus-life"},
							{label: "Financial Aid", path: "/financial-aid"},
							{label: "Tactical Plan", path: "/tactical-plan"},
						]
					},
					{
						label: "Faculty & Staff",
						onClick: () => {},
						subLinks: [
							{label: "Academic Advising", path: "/academic-advising"},
							{label: "Academic Affairs", path: "/academic-affairs"},
							{label: "Business Office", path: "/business-office"},
							{label: "Facilities Management", path: "/facilities-management"},
							{label: "Human Resources", path: "/human-resources"},
							{label: "Library & ICS", path: "/library-ics"},
							{label: "Campus Life", path: "/campus-life"},
							{label: "Notable Achievements", path: "/notable-achievements"},
							{label: "Registrar's Office", path: "/registrars-office"},
							{label: "Resources & Tools", path: "/resources-tools"},
							{label: "Safety & Security", path: "/safety-security"},
							{label: "Tactical Plan", path: "/tactical-plan"},
						]
					},
					{
						label: "Alumni",
						onClick: () => {},
						subLinks: [
							{label: "Alumni Homepage", path: "/alumni-homepage"},
							{label: "Alumni Events", path: "/alumni-events"},
							{label: "Giving to UWC", path: "/giving-to-uwc"},
						]
					}
				]}
				generalMenuItems={[
					{label: "About UWC", path: "/about-uwc"},
					{label: "Calendar", path: "/calendar"},
					{label: "Library & ICS", path: "/library-ics"},
					{label: "Donate", path: "/donate"},
					{label: "News & Events", path: "/news-events"},
					{label: "Contact Us", path: "/contact-us"},
					{label: 'Vacancies', path: '/vacancies'},
				]}
			/>

			<div className='uwc-banner'>
				<h3 style={{marginBottom: '20px'}}>UWC Banner/Hero</h3>
				<UWCBanner
					height='full'
					transition='fade'
					overlay={true}
					showControls
					showIndicators
					autoPlayInterval={5000}
					slides={[
						{
							mediaType: "video",
							videoSrc: slideVideo,
							videoAutoPlay: true,
							videoMuted: true,
							videoLoop: true,

							title: "Explore the Vibrant World of UWC",
							action: { label: "Discover More", url: "/about" },

							indicatorTitle: "Campus Life",
							indicatorSubtitle: "Experience Diversity and Inclusion at UWC - A Home for All.",
						},
						{
							mediaType: "image",
							imageSrc: slideImage,
							imageAlt: "Students graduating",

							title: "Celebrate Achievement at UWC Graduation",
							action: { label: "View Details", url: "/graduation" },

							indicatorTitle: "Graduation",
							indicatorSubtitle: "Honoring Success and New Beginnings.",
						},
						{
							mediaType: "image",
							imageSrc: slideImage2,
							imageAlt: "Students walking around campus",
							title: "Join a Thriving Academic Community at UWC",
							action: { label: "Apply Now", url: "/apply" },
							indicatorTitle: "Learn without Limits",
							indicatorSubtitle: "Find your place in a world of ideas and innovation.",
						}
					]}
				/>
				<div className='spacing-10'></div>
				<h3 style={{marginBottom: '20px'}}>UWC Banner/Hero</h3>
				<UWCBanner
					height='half'
					transition='fade'
					overlay={true}
					showControls={false}
					showIndicators={false}
					slides={[
						{
							mediaType: "image",
							imageSrc: slideImage2,
							imageAlt: "Students graduating",

							title: "Celebrate Achievement at UWC Graduation",
							action: { label: "View Details", url: "/graduation" },

							indicatorTitle: "Graduation",
							indicatorSubtitle: "Honoring Success and New Beginnings.",
						},
					]}
				/>
			</div>

			<div className='container'>
				<div className="stats-container" >
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
				<div className="uwc-cards">
					<h3 style={{marginBottom: '20px'}}>UWC Cards - With Images</h3>
					<div className="uwc-cards-container d-flex flex-row gap-20">
						<UWCCard
							image="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&w=800"
							eyebrow="Design"
							heading="Creating User-Centered Interfaces"
							headingLink="#"
						>
							<p>
								Learn how to design user interfaces that prioritize usability and accessibility. 
							</p>
							<ul>
								<li>Understand user behavior</li>
								<li>Build consistent layouts</li>
								<li>Test with real users</li>
							</ul>
						</UWCCard>
						<UWCCard
							image='https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&w=800'
							eyebrow="Development"
							heading="Modern React Patterns"
							headingLink="#"
						>
							<p>
								Explore React patterns like compound components, render props, and custom hooks.
							</p>
							<ul>
								<li>Understand user behavior</li>
								<li>Build consistent layouts</li>
								<li>Test with real users</li>
							</ul>
						</UWCCard>
						<UWCCard
							image='https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?auto=format&w=800'
							eyebrow="Education"
							heading="University Graduation Season"
							headingLink="#"
						>
							<p>
								Explore React patterns like compound components, render props, and custom hooks.
							</p>
							<ul>
								<li>Understand user behavior</li>
								<li>Build consistent layouts</li>
								<li>Test with real users</li>
							</ul>
						</UWCCard>
					</div>
					<div className='spacing-10'></div>
					<h4 style={{marginBottom: '20px'}}>UWC Cards - Without Images</h4>
					<div className="uwc-cards-container d-flex flex-row gap-20">
						<UWCCard
							// image="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&w=800"
							eyebrow="Design"
							heading="Creating User-Centered Interfaces"
							headingLink="#"
						>
							<p>
								Learn how to design user interfaces that prioritize usability and accessibility. 
							</p>
						</UWCCard>
						<UWCCard
							// image='https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?auto=format&w=800'
							eyebrow="Development"
							heading="Modern React Patterns"
							headingLink="#"
						>
							<p>
								Explore React patterns like compound components, render props, and custom hooks.
							</p>
						</UWCCard>
						<UWCCard
							// image='https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?auto=format&w=800'
							eyebrow="Education"
							heading="University Graduation Season"
							headingLink="#"
						>
							<p>
								Explore React patterns like compound components, render props, and custom hooks.
							</p>
						</UWCCard>
					</div>
				</div>
				<div className='spacing-10'></div>
				<div className='toast-btn-container'>
					<h3 style={{marginBottom: '20px'}}>Toast/Snackbar</h3>
					<div className='d-flex flex-row gap-20'>
						<UWCButton onClick={() => showToast({
							title: 'Saved',
							description: 'Your changes were saved successfully.',
							type: 'success',
							position: 'top-right',
							duration: 4500,
							actionLabel: 'View',
							onAction: () => alert('viewing...'),
						})} >Show Success Toast</UWCButton>

						<UWCButton kind='danger' onClick={() => showToast({
							title: 'Oops',
							description: 'There was an error saving.',
							type: 'error',
							position: 'top-right',
							duration: 6000,
						})}>Show Error</UWCButton>
						<UWCButton kind='secondary' onClick={() => showToast({
							title: 'Heads up',
							description: 'This action requires confirmation.',
							type: 'warning',
							position: 'bottom-left',
							duration: 6000,
							actionLabel: 'Confirm',
							onAction: () => alert('confirmed'),
						})}>Show Warning</UWCButton>
						<UWCButton kind='ghost' onClick={() => showToast({
							title: 'FYI',
							description: 'Some informational text.',
							type: 'info',
							position: 'bottom-right',
							duration: 3500,
						})}>Show Info</UWCButton>
					</div>
				</div>
				<div className='spacing-10'></div>
				<div className="uwc-modal">
					<h3 style={{marginBottom: '20px'}}>UWC Modals</h3>
					<div className='d-flex flex-row gap-20'>
						<UWCButton onClick={() => {setModal1Open(true)}}>Open Modal 1</UWCButton>
						<UWCButton onClick={() => {setModal2Open(true)}}>Open Modal 2</UWCButton>
						<UWCButton onClick={() => {setModal3Open(true)}} kind='secondary'>Open Modal 3</UWCButton>
						<UWCModal
							open={modal1Open}
							modalAriaLabel="Example Modal"
							modalHeading="Delete Record"
							modalLabel="Danger Zone"
							danger
							numberOfButtons={2}
							primaryButtonText="Delete"
							secondaryButtonText="Cancel"
							preventCloseOnClickOutside
							hasScrollingContent
							size="md"
							onRequestClose={() => setModal1Open(false)}
							onRequestSubmit={() => {
								console.log("Deleted!");
								showToast({
									title: 'Delete',
									description: 'The item was successfully deleted',
									type: 'success',
									position: 'top-right',
									duration: 4500,
									actionLabel: 'Undo',
									onAction: () => alert('viewing...'),
								})
								setModal1Open(false);
							}}
						>
							<p>
							Are you sure you want to delete this record? This action cannot be undone.
							</p>
						</UWCModal>
						<UWCModal
							open={modal2Open}
							modalAriaLabel="Usage Guidelines"
							modalHeading="Guidelines for Submitting Your Project"
							modalLabel="Information"
							passiveModal
							hasScrollingContent
							size="lg"
							onRequestClose={() => setModal2Open(false)}
						>
							<div style={{ lineHeight: "1.6" }}>
								<p>
									Welcome to the project submission portal. Please take a moment to review
									these guidelines before proceeding.
								</p>

								<h4>Project Requirements</h4>
								<ul>
									<li>Your project must be original and adhere to institutional policies.</li>
									<li>All assets (images, code, media) should be properly licensed.</li>
									<li>Each submission should include documentation and contact details.</li>
								</ul>

								<h4>File Upload Guidelines</h4>
								<p>
									The system accepts compressed ZIP files under 100MB. Please include a
									README file describing installation or setup steps if applicable.
								</p>

								<h4>Evaluation Process</h4>
								<p>
									After submission, your project will be reviewed by our committee. You will
									receive a confirmation email once the review process starts.
								</p>

								<p>
									If you encounter issues during submission, please contact{" "}
									<a href="mailto:support@example.com">support@example.com</a> for
									assistance.
								</p>
							</div>
						</UWCModal>
						<UWCModal
							open={modal3Open}
							modalAriaLabel="Add New Project"
							modalHeading="Add a New Project"
							modalLabel="Projects"
							numberOfButtons={2}
							primaryButtonText="Save Project"
							secondaryButtonText="Cancel"
							// hasScrollingContent
							size="sm"
							onRequestClose={() => setModal3Open(false)}
							onRequestSubmit={() =>{
								handleSubmit;
								showToast({
									title: 'Added Project',
									description: 'You have successfully added a new project',
									type: 'success',
									position: 'bottom-right',
									duration: 4500,
								});
								setModal3Open(false)}	
							}
						>
							<div style={{ display: "grid", gap: "1rem" }}>
								<UWCTextInput
									readonly={false}
									id="project-name"
									labelText="Project Name"
									placeholder="Enter project name"
									value={formData.name}
									onChange={(e) => handleChange("name", e.target.value)}
									required
								/>

								<TextArea
									id="project-description"
									labelText="Description"
									placeholder="Describe the project"
									value={formData.description}
									onChange={(e) => handleChange("description", e.target.value)}
								/>

								<Select
									id="project-status"
									labelText="Status"
									value={formData.status}
									onChange={(e) => handleChange("status", e.target.value)}
								>
									<SelectItem value="active" text="Active" />
									<SelectItem value="on-hold" text="On Hold" />
									<SelectItem value="completed" text="Completed" />
								</Select>
							</div>
						</UWCModal>
					</div>
				</div>
				<div className='spacing-10'></div>
				<div className='uwc-password-input'>
					<h3 style={{marginBottom: '20px'}}>UWC Password Input</h3>
					<div className='d-flex flex-row gap-20'>
						<UWCPasswordInput
							id='password1'
							labelText='Password'
							placeholder='Password'
							size='md'
						/>
						<UWCPasswordInput
							id='password2'
							labelText='Password'
							placeholder='Password'
							invalid
							invalidText='Password cannot be empty, enter password'
							size='lg'
						/>
						<UWCPasswordInput
							id='password1'
							labelText='Password'
							placeholder='Password'
							size='lg'
							disabled
						/>
					</div>
				</div>
				<div className='spacing-10'></div>
				<div className='uwc-textarea'>
					<h3 style={{marginBottom: '20px'}}>UWC Textarea</h3>
					<div className='d-flex flex-row gap-20'>
						<UWCTextArea
							id="feedback"
							labelText="Your Feedback"
							placeholder="Type something..."
							enableCounter
							counterMode="character"
							maxCount={500}
							value={comments}
							onChange={(e) => {setComments(e.target.value)}}
						/>
						<UWCTextArea
							id='texting'
							labelText='Comment Error'
							value='A father and daughter were working in the forest'
							invalid
							invalidText='This comment is too short'
						/>
						<UWCTextArea
							id='texting'
							labelText='No Label'
							value='Theres no label on this textarea and it is disabled'
							hideLabel
							disabled
						/>
					</div>
				</div>
				<div className='spacing-10'></div>
				<div className='uwc-accordion'>
					<h3 style={{marginBottom: '20px'}}>UWC Accordion</h3>
					<UWCAccordion
						items={items}
						size='md'
						openItems={openItems}
						onToggleItem={handleToggle}
					/>

				</div>
				<div className='spacing-10'></div>
				<div className='uwc-pagination'>
					<h3 style={{marginBottom: '20px'}}>UWC Pagination</h3>
					<div className='d-flex flex-column gap-20'>
						<UWCPagination
							totalItems={125}
							page={1}
							pageSize={10}
							onPageChange={(newPage) => console.log("Navigated to page:", newPage)}
							pageSizes={[10, 20, 50]}
							id='example-pagination'
							size='lg'
						/>
						<UWCPagination
							totalItems={103}
							page={1}
							pageSize={10}
							onPageChange={(newPage) => console.log("Navigated to page:", newPage)}
							pageSizes={[10, 20, 30, 40, 50]}
							id='example-pagination'
							size='md'
						/>

						<UWCPagination
							totalItems={54}
							page={4}
							pageSize={10}
							onPageChange={(newPage) => console.log("Navigated to page:", newPage)}
							pageSizes={[10, 20, 30, 40, 50]}
							id='example-pagination'
							size='sm'
						/>
					</div>
				</div>
				<div className='spacing-10'></div>
				<div className='uwc-progress-indicators'>
					<h3 style={{marginBottom: '20px'}}>UWC Progress Indicators</h3>
					<div className='d-flex flex-column gap-20'>
						<UWCProgressIndicator
							currentIndex={0}
							steps={[
								{ id: "1", label: "Start" },
								{ id: "2", label: "Configure" },
								{ id: "3", label: "Finish", state: "disabled" }
							]}
						/>
						<div className='spacing-5'></div>
						<UWCProgressIndicator
							currentIndex={2}
							spaceEqually
							steps={[
								{ id: "1", label: "Application Received" },
								{ id: "2", label: "Under Review" },
								{ id: "3", label: "Interview Scheduled" },
								{ id: "4", label: "Decision Made", state: "disabled" },
								{ id: "5", label: "Notification Sent" }
							]}
						/>
						<div className='spacing-5'></div>
						<UWCProgressIndicator
							currentIndex={4}
							vertical
							steps={[
								{ id: "1", label: "Step One" },
								{ id: "2", label: "Step Two" },
								{ id: "3", label: "Step Three" },
								{ id: "4", label: "Step Four" },
								{ id: "5", label: "Step Five" },
							]}
						/>
					</div>
				</div>
				<div className='spacing-10'></div>
				<div className='uwc-avatar'>
					<h3 style={{marginBottom: '20px'}}>UWC Avatar</h3>
					<div className='d-flex flex-row gap-20'>
						<UWCAvatar
							size='sm'
							shape='square'
							imageUrl='https://randomuser.me/api/portraits/women/44.jpg'
						/>
						<UWCAvatar
							size='md'
							shape='square'
							imageUrl='https://randomuser.me/api/portraits/women/44.jpg'
						/>
						<UWCAvatar
							size='lg'
							shape='square'
							imageUrl='https://randomuser.me/api/portraits/women/44.jpg'
						/>
						<UWCAvatar
							size='xl'
							shape='square'
							imageUrl='https://randomuser.me/api/portraits/women/44.jpg'
						/>
						<UWCAvatar
							size='sm'
							shape='circle'
							imageUrl='https://randomuser.me/api/portraits/women/44.jpg'
						/>
						<UWCAvatar
							size='md'
							shape='circle'
							imageUrl='https://randomuser.me/api/portraits/women/44.jpg'
						/>
						<UWCAvatar
							size='lg'
							shape='circle'
							imageUrl='https://randomuser.me/api/portraits/women/44.jpg'
						/>
						<UWCAvatar
							size='xl'
							shape='circle'
							imageUrl='https://randomuser.me/api/portraits/women/44.jpg'
						/>
					</div>
					<div className='spacing-10'></div>
					<h4 style={{marginBottom: '20px'}}>Avatar with initials</h4>
					<div className='d-flex flex-row gap-20'>
						<UWCAvatar
							size='sm'
							shape='square'
							name='Jessica Nkosi'
						/>
						<UWCAvatar
							size='md'
							shape='square'
							name='Jessica Nkosi'
						/>
						<UWCAvatar
							size='lg'
							shape='square'
							name='Jessica Nkosi'
						/>
						<UWCAvatar
							size='xl'
							shape='square'
							name='Jessica Nkosi'
						/>
						<UWCAvatar
							size='sm'
							shape='circle'
							name='Jessica Nkosi'
						/>
						<UWCAvatar
							size='md'
							shape='circle'
							name='Jessica Nkosi'
						/>
						<UWCAvatar
							size='lg'
							shape='circle'
							name='Jessica Nkosi'
						/>
						<UWCAvatar
							size='xl'
							shape='circle'
							name='Jessica Nkosi'
						/>
					</div>
					<div className='spacing-10'></div>
					<h4 style={{marginBottom: '20px'}}>Default Avatar (No image or initial)</h4>
					<div className='d-flex flex-row gap-20'>
						<UWCAvatar
							size='sm'
							shape='square'
						/>
						<UWCAvatar
							size='md'
							shape='square'
						/>
						<UWCAvatar
							size='lg'
							shape='square'
						/>
						<UWCAvatar
							size='xl'
							shape='square'
						/>
						<UWCAvatar
							size='sm'
							shape='circle'
						/>
						<UWCAvatar
							size='md'
							shape='circle'
						/>
						<UWCAvatar
							size='lg'
							shape='circle'
						/>
						<UWCAvatar
							size='xl'
							shape='circle'
						/>
					</div>
					<div className='spacing-10'></div>
					<h4 style={{marginBottom: '20px'}}>Avatar with Status</h4>
					<div className='d-flex flex-row gap-20'>
						<UWCAvatar
							size='lg'
							shape='circle'
							imageUrl='https://randomuser.me/api/portraits/women/44.jpg'
							status='online'
						/>
						<UWCAvatar
							size='lg'
							shape='circle'
							imageUrl='https://randomuser.me/api/portraits/women/44.jpg'
							status='offline'
						/>
						<UWCAvatar
							size='lg'
							shape='circle'
							imageUrl='https://randomuser.me/api/portraits/women/44.jpg'
							status='busy'
						/>
						<UWCAvatar
							size='lg'
							shape='circle'
							imageUrl='https://randomuser.me/api/portraits/women/44.jpg'
							status='away'
						/>
						<UWCAvatar
							size='lg'
							shape='circle'
							imageUrl='https://randomuser.me/api/portraits/women/44.jpg'
							status='none'
						/>

						<UWCAvatar
							size='lg'
							shape='circle'
							status='online'
							statusPosition='top-left'
						/>
						<UWCAvatar
							size='lg'
							shape='circle'
							name='Jessica Nkosi'
							status='away'
							statusPosition='top-left'
						/>
					</div>
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