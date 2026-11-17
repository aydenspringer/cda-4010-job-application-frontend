import { Button } from '@/components/ui/button'
import Layout from './layout/layout'
import { Fragment, useRef, useState, type ChangeEvent, type ReactNode } from 'react';
import { MenuIcon, PlusIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Checkbox } from './components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
import { ToggleGroup, ToggleGroupItem } from './components/ui/toggle-group';
import { Progress } from './components/ui/progress';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './components/ui/alert-dialog';

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const yesOrNo = ["Yes", "No"];

const positions = [
  "Office Assistant",
  "Library Assistant",
  "Tutor",
  "Teaching Assistant",
  "Research Assistant",
  "Resident Assistant",
  "Campus Tour Guide",
  "IT Help Desk Assistant",
  "Recreation Center Attendant",
  "Dining Services Associate",
  "Bookstore Associate",
];

const salaryRanges = [
  "Under 50,000",
  "50,000-60,000",
  "60,000-70,000",
  "70,000-80,000",
  "Over 80,000",
];

const relationships = ["Mother", "Father", "Sister", "Brother", "Friend", "Spouse", "Other"];

const races = ["White", "Black", "Asian", "Other", "Prefer Not To Say"];

const genders = ["Female", "Male", "Other"];

const daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const employmentTypes = ["Full-time", "Part-time"];

const crimeTypes = ["Misdemeanor", "Felony"];

const militaryAnswers = ["I do not wish to answer", "No", "Yes"];

const militaryBranches = ["Army", "Navy", "Air Force", "Marine Corps", "Coast Guard", "Space Force"];

const educationLevels = ["High School", "Undergraduate", "Graduate", "Post-Graduate", "Professional", "Other"];

// note/todo the pages' order don't really make sense. however that is how how guide
// displays them, and the approved proposal, so I am leaving it
// pages of the application, in order

const pageTitles = [
  "Personal Information",
  "Emergency Contact",
  "Demographics",
  "Availability",
  "References",
  "Background",
  "Education",
  "Work Experience",
  "Resume & Signature",
  "Review",
] as const;

type PageTitle = (typeof pageTitles)[number];

// One criminal conviction. An applicant can add as many as they need.
type Conviction = {
  date: string;
  type: string;
  description: string;
  confinement: string;
};

const emptyConviction: Conviction = {
  date: "",
  type: "",
  description: "",
  confinement: "",
};

// past job we ask in the form, allows multiple this is used in an arr/list
type Job = {
  employerName: string;
  employerAddress: string;
  employerPhone: string;
  employerEmail: string;
  startDate: string;
  endDate: string;
  jobTitle: string;
  reasonForLeaving: string;
};

const emptyJob: Job = {
  employerName: "",
  employerAddress: "",
  employerPhone: "",
  employerEmail: "",
  startDate: "",
  endDate: "",
  jobTitle: "",
  reasonForLeaving: "",
};

type Answers = {
  // Personal info
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  position: string;
  salary: string;
  isOver18: string;

  // Emergency contact
  contactFirstName: string;
  contactLastName: string;
  contactStreet: string;
  contactCity: string;
  contactState: string;
  contactZip: string;
  contactPhone: string;
  contactEmail: string;
  contactRelationship: string;

  // Demographics
  race: string[];
  gender: string;

  // availability
  daysAvailable: string[];
  employmentType: string[];
  weeklyHours: string;
  canWorkNights: string;
  hasBeenFired: string;
  hasCriminalRecord: string;
  convictions: Conviction[];

  // Reference
  referenceName: string;
  referenceTitle: string;
  referenceCompany: string;
  referenceAddress: string;
  referencePhone: string;
  referenceEmail: string;

  // Background
  hasDriversLicense: string;
  servedInMilitary: string;
  honorableDischarge: string;
  yearsServed: string;
  militaryBranch: string;
  ownsVehicle: string;

  // Edu
  educationLevel: string;
  schoolName: string;
  schoolLocation: string;
  graduationDate: string;
  major: string;

  // Work experience
  jobs: Job[];

  // Resume and signature
  resumeFileName: string;
  signature: string;
  signatureDate: string;
};

const emptyAnswers: Answers = {
  firstName: "",
  lastName: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  email: "",
  position: "",
  salary: "",
  isOver18: "",

  contactFirstName: "",
  contactLastName: "",
  contactStreet: "",
  contactCity: "",
  contactState: "",
  contactZip: "",
  contactPhone: "",
  contactEmail: "",
  contactRelationship: "",

  race: [],
  gender: "",

  daysAvailable: [],
  employmentType: [],
  weeklyHours: "",
  canWorkNights: "",
  hasBeenFired: "",
  hasCriminalRecord: "",
  convictions: [],

  referenceName: "",
  referenceTitle: "",
  referenceCompany: "",
  referenceAddress: "",
  referencePhone: "",
  referenceEmail: "",

  hasDriversLicense: "",
  servedInMilitary: "",
  honorableDischarge: "",
  yearsServed: "",
  militaryBranch: "",
  ownsVehicle: "",

  educationLevel: "",
  schoolName: "",
  schoolLocation: "",
  graduationDate: "",
  major: "",

  jobs: [],

  resumeFileName: "",
  signature: "",
  signatureDate: "",
};

// An error message for each answer, an empty string means no error.
type Errors = Partial<Record<keyof Answers, string>>;


const STORAGE_KEY = "unf-application";

type SavedProgress = {
  answers: Answers;
  currentPage: number;
  furthestPage: number;
};

function loadSavedProgress(): SavedProgress | null {
  const savedText = localStorage.getItem(STORAGE_KEY);
  if (savedText === null) {
    return null;
  }
  return JSON.parse(savedText);
}

function saveProgress(progress: SavedProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function clearSavedProgress() {
  localStorage.removeItem(STORAGE_KEY);
}


// Checking answers

const REQUIRED_MESSAGE = "This field is required.";

function checkRequired(value: string) {
  if (value.trim() === "") {
    return REQUIRED_MESSAGE;
  }
  return "";
}

// I am not a regex expert! The regex are source by AI
function checkLetters(value: string) {
  if (value.trim() === "") {
    return REQUIRED_MESSAGE;
  }
  // Letters, spaces, hyphens and apostrophes (for names like Mary-Ann or O'Brien)
  if (!/^[A-Za-z' -]+$/.test(value)) {
    return "Can only contain letters.";
  }
  return "";
}

function checkLettersAndNumbers(value: string) {
  if (value.trim() === "") {
    return REQUIRED_MESSAGE;
  }
  // Also allows common address punctuation like commas, periods and #
  if (!/^[A-Za-z0-9 .,#'/-]+$/.test(value)) {
    return "Can only contain letters and numbers.";
  }
  return "";
}

function checkZip(value: string) {
  if (value.trim() === "") {
    return REQUIRED_MESSAGE;
  }
  if (!/^\d{5}$/.test(value)) {
    return "Must be a 5-digit ZIP code.";
  }
  return "";
}

function checkPhone(value: string) {
  if (value.trim() === "") {
    return REQUIRED_MESSAGE;
  }
  if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(value)) {
    return "Must be a 10-digit phone number, e.g. (904) 620-1000.";
  }
  return "";
}

function checkEmail(value: string) {
  if (value.trim() === "") {
    return REQUIRED_MESSAGE;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "Must be a valid email, e.g. Ozzie.Osprey@unf.edu.";
  }
  return "";
}

function checkWholeNumber(value: string) {
  if (value.trim() === "") {
    return REQUIRED_MESSAGE;
  }
  if (!/^\d+$/.test(value)) {
    return "Can only contain numbers.";
  }
  return "";
}

function checkAtLeastOne(values: string[]) {
  if (values.length === 0) {
    return "Please choose at least one option.";
  }
  return "";
}

function findErrors(page: PageTitle, answers: Answers): Errors {
  const errors: Errors = {};

  if (page === "Personal Information") {
    errors.firstName = checkLetters(answers.firstName);
    errors.lastName = checkLetters(answers.lastName);
    errors.street = checkLettersAndNumbers(answers.street);
    errors.city = checkLetters(answers.city);
    errors.state = checkRequired(answers.state);
    errors.zip = checkZip(answers.zip);
    errors.phone = checkPhone(answers.phone);
    errors.email = checkEmail(answers.email);
    errors.position = checkRequired(answers.position);
    errors.salary = checkRequired(answers.salary);
    errors.isOver18 = checkRequired(answers.isOver18);
  }

  if (page === "Emergency Contact") {
    errors.contactFirstName = checkLetters(answers.contactFirstName);
    errors.contactLastName = checkLetters(answers.contactLastName);
    errors.contactStreet = checkLettersAndNumbers(answers.contactStreet);
    errors.contactCity = checkLetters(answers.contactCity);
    errors.contactState = checkRequired(answers.contactState);
    errors.contactZip = checkZip(answers.contactZip);
    errors.contactPhone = checkPhone(answers.contactPhone);
    errors.contactEmail = checkEmail(answers.contactEmail);
    errors.contactRelationship = checkRequired(answers.contactRelationship);
  }

  if (page === "Demographics") {
    errors.race = checkAtLeastOne(answers.race);
    errors.gender = checkRequired(answers.gender);
  }

  if (page === "Availability") {
    errors.daysAvailable = checkAtLeastOne(answers.daysAvailable);
    errors.employmentType = checkAtLeastOne(answers.employmentType);
    errors.weeklyHours = checkWholeNumber(answers.weeklyHours);
    errors.canWorkNights = checkRequired(answers.canWorkNights);
    errors.hasBeenFired = checkRequired(answers.hasBeenFired);
    errors.hasCriminalRecord = checkRequired(answers.hasCriminalRecord);

    // These questions only show up if  the applicant answers Yes
    if (answers.hasCriminalRecord === "Yes" && answers.convictions.length === 0) {
      errors.convictions = "Please add at least one conviction.";
    }
  }

  if (page === "References") {
    errors.referenceName = checkLetters(answers.referenceName);
    errors.referenceTitle = checkRequired(answers.referenceTitle);
    errors.referenceCompany = checkLettersAndNumbers(answers.referenceCompany);
    errors.referenceAddress = checkLettersAndNumbers(answers.referenceAddress);
    errors.referencePhone = checkPhone(answers.referencePhone);
    errors.referenceEmail = checkEmail(answers.referenceEmail);
  }

  if (page === "Background") {
    errors.hasDriversLicense = checkRequired(answers.hasDriversLicense);
    errors.servedInMilitary = checkRequired(answers.servedInMilitary);
    errors.ownsVehicle = checkRequired(answers.ownsVehicle);

    // * these questions only show up when the applicant answers Yes as well
    if (answers.servedInMilitary === "Yes") {
      errors.honorableDischarge = checkRequired(answers.honorableDischarge);
      errors.yearsServed = checkWholeNumber(answers.yearsServed);
      errors.militaryBranch = checkRequired(answers.militaryBranch);
    }
  }

  if (page === "Education") {
    errors.educationLevel = checkRequired(answers.educationLevel);
    errors.schoolName = checkLettersAndNumbers(answers.schoolName);
    errors.schoolLocation = checkLettersAndNumbers(answers.schoolLocation);
    errors.graduationDate = checkRequired(answers.graduationDate);
    errors.major = checkLettersAndNumbers(answers.major);
  }

  if (page === "Resume & Signature") {
    errors.signature = checkLetters(answers.signature);
    errors.signatureDate = checkRequired(answers.signatureDate);
  }

  return errors;
}

// Checks the fields inside the "Add Conviction" popup
function findConvictionErrors(conviction: Conviction) {
  const errors: Partial<Record<keyof Conviction, string>> = {};
  errors.date = checkRequired(conviction.date);
  errors.type = checkRequired(conviction.type);
  errors.description = checkRequired(conviction.description);
  return errors;
}

// Checks the fields inside the "Add Job" popup
function findJobErrors(job: Job) {
  const errors: Partial<Record<keyof Job, string>> = {};
  errors.employerName = checkLettersAndNumbers(job.employerName);
  errors.employerAddress = checkLettersAndNumbers(job.employerAddress);
  errors.employerPhone = checkPhone(job.employerPhone);
  errors.employerEmail = checkEmail(job.employerEmail);
  errors.startDate = checkRequired(job.startDate);
  errors.endDate = checkRequired(job.endDate);
  errors.jobTitle = checkRequired(job.jobTitle);
  errors.reasonForLeaving = checkRequired(job.reasonForLeaving);
  return errors;
}

function hasErrors(errors: Record<string, string | undefined>) {
  for (const message of Object.values(errors)) {
    if (message !== "") {
      return true;
    }
  }
  return false;
}

// Turns "9046201000" into "(904) 620-1000" while the user types
// *This function was sourced from an LLM  to work completely
function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10);

  if (digits.length <= 3) {
    return digits;
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

// --Reusable form fields--

// Wraps fields to allow errors msg without annoying layout shifts
function FieldWrapper({ id, label, required, error, children }: {
  id?: string;
  label: string;
  required: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="gap-1">
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
      <p className="min-h-5 text-sm text-destructive">{error}</p>
    </div>
  )
}

function TextField({ id, label, value, onChange, error, required = true, type = "text", inputMode }: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  type?: "text" | "email" | "date";
  inputMode?: "text" | "tel" | "numeric";
}) {
  return (
    <FieldWrapper id={id} label={label} required={required} error={error}>
      <Input
        id={id}
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
      />
    </FieldWrapper>
  )
}

function SelectField({ id, label, options, value, onChange, error }: {
  id: string;
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <FieldWrapper id={id} label={label} required={true} error={error}>
      <Select value={value === "" ? null : value} onValueChange={(newValue) => onChange(newValue as string)}>
        <SelectTrigger id={id} className="w-full sm:w-70" aria-invalid={Boolean(error)}>
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </FieldWrapper>
  )
}

function RadioField({ label, options, value, onChange, error }: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <FieldWrapper label={label} required={true} error={error}>
      <RadioGroup value={value} onValueChange={(newValue) => onChange(newValue as string)} className="flex flex-wrap gap-x-5 gap-y-2">
        {options.map((option) => (
          <Label key={option} className="font-normal">
            <RadioGroupItem value={option} aria-invalid={Boolean(error)} />
            {option}
          </Label>
        ))}
      </RadioGroup>
    </FieldWrapper>
  )
}

function CheckboxField({ label, options, value, onChange, error }: {
  label: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
}) {
  function handleToggle(option: string) {
    if (value.includes(option)) {
      onChange(value.filter((item) => item !== option));
    } else {
      onChange([...value, option]);
    }
  }

  return (
    <FieldWrapper label={label} required={true} error={error}>
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        {options.map((option) => (
          <Label key={option} className="font-normal">
            <Checkbox
              checked={value.includes(option)}
              onCheckedChange={() => handleToggle(option)}
              aria-invalid={Boolean(error)}
            />
            {option}
          </Label>
        ))}
      </div>
    </FieldWrapper>
  )
}

// A row of boxes like M T W T F S S
function DayPickerField({ label, value, onChange, error }: {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
}) {
  function handleChange(selectedDays: string[]) {
    // sorts the days in the order of week order, not order user did it
    const daysInOrder = daysOfTheWeek.filter((day) => selectedDays.includes(day));
    onChange(daysInOrder);
  }

  return (
    <FieldWrapper label={label} required={true} error={error}>
      <ToggleGroup multiple variant="outline" value={value} onValueChange={handleChange}>
        {daysOfTheWeek.map((day) => (
          <ToggleGroupItem
            key={day}
            value={day}
            title={day}
            aria-label={day}
            aria-invalid={Boolean(error)}
            className="size-10 aria-pressed:border-primary! aria-pressed:bg-primary! aria-pressed:text-primary-foreground!"
          >
            {day[0]}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </FieldWrapper>
  )
}

// A saved job or conviction, shown as a small card with Edit and Remove buttons
function EntryCard({ title, details, onEdit, onRemove }: {
  title: string;
  details: string;
  onEdit: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border p-3">
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{details}</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onEdit}>Edit</Button>
        <Button variant="destructive" size="sm" onClick={onRemove}>Remove</Button>
      </div>
    </div>
  )
}


// Popups for adding a conviction or a job.===They are only shown while open
function ConvictionDialog({ startingValue, onSave, onCancel }: {
  startingValue: Conviction;
  onSave: (conviction: Conviction) => void;
  onCancel: () => void;
}) {
  const [conviction, setConviction] = useState<Conviction>(startingValue);
  const [errors, setErrors] = useState<Partial<Record<keyof Conviction, string>>>({});

  function update(field: keyof Conviction, value: string) {
    setConviction({ ...conviction, [field]: value });
    setErrors({ ...errors, [field]: "" });
  }

  function handleSave() {
    const convictionErrors = findConvictionErrors(conviction);

    if (hasErrors(convictionErrors)) {
      setErrors(convictionErrors);
      return;
    }

    onSave(conviction);
  }

  return (
    <Dialog open={true} onOpenChange={(isOpen) => { if (!isOpen) onCancel(); }}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Conviction</DialogTitle>
          <DialogDescription>Enter the details of the conviction.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          <TextField
            id="convictionDate"
            label="Date of Conviction"
            type="date"
            value={conviction.date}
            onChange={(value) => update("date", value)}
            error={errors.date}
          />
          <RadioField
            label="Misdemeanor or Felony"
            options={crimeTypes}
            value={conviction.type}
            onChange={(value) => update("type", value)}
            error={errors.type}
          />
          <TextField
            id="convictionDescription"
            label="Description"
            value={conviction.description}
            onChange={(value) => update("description", value)}
            error={errors.description}
          />
          <TextField
            id="convictionConfinement"
            label="Confinement (months/years)"
            required={false}
            value={conviction.confinement}
            onChange={(value) => update("confinement", value)}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function JobDialog({ startingValue, onSave, onCancel }: {
  startingValue: Job;
  onSave: (job: Job) => void;
  onCancel: () => void;
}) {
  const [job, setJob] = useState<Job>(startingValue);
  const [errors, setErrors] = useState<Partial<Record<keyof Job, string>>>({});

  function update(field: keyof Job, value: string) {
    setJob({ ...job, [field]: value });
    setErrors({ ...errors, [field]: "" });
  }

  function handleSave() {
    const jobErrors = findJobErrors(job);

    if (hasErrors(jobErrors)) {
      setErrors(jobErrors);
      return;
    }

    onSave(job);
  }

  return (
    <Dialog open={true} onOpenChange={(isOpen) => { if (!isOpen) onCancel(); }}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Job</DialogTitle>
          <DialogDescription>Enter the details of a past job.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
          <TextField
            id="jobTitle"
            label="Job Title"
            value={job.jobTitle}
            onChange={(value) => update("jobTitle", value)}
            error={errors.jobTitle}
          />
          <TextField
            id="employerName"
            label="Employer Name"
            value={job.employerName}
            onChange={(value) => update("employerName", value)}
            error={errors.employerName}
          />
          <TextField
            id="employerAddress"
            label="Address"
            value={job.employerAddress}
            onChange={(value) => update("employerAddress", value)}
            error={errors.employerAddress}
          />
          <TextField
            id="employerPhone"
            label="Telephone Number"
            inputMode="tel"
            value={job.employerPhone}
            onChange={(value) => update("employerPhone", formatPhone(value))}
            error={errors.employerPhone}
          />
          <TextField
            id="employerEmail"
            label="Email Address"
            type="email"
            value={job.employerEmail}
            onChange={(value) => update("employerEmail", value)}
            error={errors.employerEmail}
          />
          <TextField
            id="reasonForLeaving"
            label="Reason for Leaving"
            value={job.reasonForLeaving}
            onChange={(value) => update("reasonForLeaving", value)}
            error={errors.reasonForLeaving}
          />
          <TextField
            id="startDate"
            label="Employment Date From"
            type="date"
            value={job.startDate}
            onChange={(value) => update("startDate", value)}
            error={errors.startDate}
          />
          <TextField
            id="endDate"
            label="Employment Date To"
            type="date"
            value={job.endDate}
            onChange={(value) => update("endDate", value)}
            error={errors.endDate}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


// pages content

type PageProps = {
  answers: Answers;
  update: <Field extends keyof Answers>(field: Field, value: Answers[Field]) => void;
  errors: Errors;
};

function PersonalInformationPage({ answers, update, errors }: PageProps) {
  return (
    <>
      <TextField
        id="firstName"
        label="First Name"
        value={answers.firstName}
        onChange={(value) => update("firstName", value)}
        error={errors.firstName}
      />
      <TextField
        id="lastName"
        label="Last Name"
        value={answers.lastName}
        onChange={(value) => update("lastName", value)}
        error={errors.lastName}
      />
      <TextField
        id="street"
        label="Street"
        value={answers.street}
        onChange={(value) => update("street", value)}
        error={errors.street}
      />
      <TextField
        id="city"
        label="City"
        value={answers.city}
        onChange={(value) => update("city", value)}
        error={errors.city}
      />
      <SelectField
        id="state"
        label="State"
        options={states}
        value={answers.state}
        onChange={(value) => update("state", value)}
        error={errors.state}
      />
      <TextField
        id="zip"
        label="ZIP Code"
        inputMode="numeric"
        value={answers.zip}
        onChange={(value) => update("zip", value)}
        error={errors.zip}
      />
      <TextField
        id="phone"
        label="Phone Number"
        inputMode="tel"
        value={answers.phone}
        onChange={(value) => update("phone", formatPhone(value))}
        error={errors.phone}
      />
      <TextField
        id="email"
        label="Email"
        type="email"
        value={answers.email}
        onChange={(value) => update("email", value)}
        error={errors.email}
      />
      <SelectField
        id="position"
        label="Position Applying For"
        options={positions}
        value={answers.position}
        onChange={(value) => update("position", value)}
        error={errors.position}
      />
      <SelectField
        id="salary"
        label="Desired Salary"
        options={salaryRanges}
        value={answers.salary}
        onChange={(value) => update("salary", value)}
        error={errors.salary}
      />
      <RadioField
        label="Are you over 18 years old?"
        options={yesOrNo}
        value={answers.isOver18}
        onChange={(value) => update("isOver18", value)}
        error={errors.isOver18}
      />
    </>
  )
}

function EmergencyContactPage({ answers, update, errors }: PageProps) {
  return (
    <>
      <p className="mb-4 text-sm text-muted-foreground">Person to be notified in case of emergency.</p>
      <TextField
        id="contactFirstName"
        label="First Name"
        value={answers.contactFirstName}
        onChange={(value) => update("contactFirstName", value)}
        error={errors.contactFirstName}
      />
      <TextField
        id="contactLastName"
        label="Last Name"
        value={answers.contactLastName}
        onChange={(value) => update("contactLastName", value)}
        error={errors.contactLastName}
      />
      <TextField
        id="contactStreet"
        label="Street"
        value={answers.contactStreet}
        onChange={(value) => update("contactStreet", value)}
        error={errors.contactStreet}
      />
      <TextField
        id="contactCity"
        label="City"
        value={answers.contactCity}
        onChange={(value) => update("contactCity", value)}
        error={errors.contactCity}
      />
      <SelectField
        id="contactState"
        label="State"
        options={states}
        value={answers.contactState}
        onChange={(value) => update("contactState", value)}
        error={errors.contactState}
      />
      <TextField
        id="contactZip"
        label="ZIP Code"
        inputMode="numeric"
        value={answers.contactZip}
        onChange={(value) => update("contactZip", value)}
        error={errors.contactZip}
      />
      <TextField
        id="contactPhone"
        label="Phone Number"
        inputMode="tel"
        value={answers.contactPhone}
        onChange={(value) => update("contactPhone", formatPhone(value))}
        error={errors.contactPhone}
      />
      <TextField
        id="contactEmail"
        label="Email"
        type="email"
        value={answers.contactEmail}
        onChange={(value) => update("contactEmail", value)}
        error={errors.contactEmail}
      />
      <SelectField
        id="contactRelationship"
        label="Relationship to Person"
        options={relationships}
        value={answers.contactRelationship}
        onChange={(value) => update("contactRelationship", value)}
        error={errors.contactRelationship}
      />
    </>
  )
}

function DemographicsPage({ answers, update, errors }: PageProps) {
  return (
    <>
      <CheckboxField
        label="Race"
        options={races}
        value={answers.race}
        onChange={(value) => update("race", value)}
        error={errors.race}
      />
      <RadioField
        label="Gender"
        options={genders}
        value={answers.gender}
        onChange={(value) => update("gender", value)}
        error={errors.gender}
      />
    </>
  )
}

function AvailabilityPage({ answers, update, errors }: PageProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  // Which conviction is being edited. null means a new one is being added.
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  function handleAdd() {
    setEditingIndex(null);
    setIsDialogOpen(true);
  }

  function handleEdit(index: number) {
    setEditingIndex(index);
    setIsDialogOpen(true);
  }

  function handleRemove(index: number) {
    const remaining = answers.convictions.filter((_, i) => i !== index);
    update("convictions", remaining);
  }

  function handleSave(conviction: Conviction) {
    if (editingIndex === null) {
      update("convictions", [...answers.convictions, conviction]);
    } else {
      const updated = [...answers.convictions];
      updated[editingIndex] = conviction;
      update("convictions", updated);
    }
    setIsDialogOpen(false);
  }

  return (
    <>
      <DayPickerField
        label="Days Available to Work"
        value={answers.daysAvailable}
        onChange={(value) => update("daysAvailable", value)}
        error={errors.daysAvailable}
      />
      <CheckboxField
        label="Employment Desired (select all that apply)"
        options={employmentTypes}
        value={answers.employmentType}
        onChange={(value) => update("employmentType", value)}
        error={errors.employmentType}
      />
      <TextField
        id="weeklyHours"
        label="Hours Weekly Willing to Work"
        inputMode="numeric"
        value={answers.weeklyHours}
        onChange={(value) => update("weeklyHours", value)}
        error={errors.weeklyHours}
      />
      <RadioField
        label="Can you work nights?"
        options={yesOrNo}
        value={answers.canWorkNights}
        onChange={(value) => update("canWorkNights", value)}
        error={errors.canWorkNights}
      />
      <RadioField
        label="Have you ever been fired from your job?"
        options={yesOrNo}
        value={answers.hasBeenFired}
        onChange={(value) => update("hasBeenFired", value)}
        error={errors.hasBeenFired}
      />
      <RadioField
        label="Have you ever been convicted of a crime?"
        options={yesOrNo}
        value={answers.hasCriminalRecord}
        onChange={(value) => update("hasCriminalRecord", value)}
        error={errors.hasCriminalRecord}
      />

      {answers.hasCriminalRecord === "Yes" && (
        <FieldWrapper label="Convictions" required={true} error={errors.convictions}>
          <div className="grid gap-2">
            {answers.convictions.map((conviction, index) => (
              <EntryCard
                key={index}
                title={`${conviction.type} on ${conviction.date}`}
                details={conviction.description}
                onEdit={() => handleEdit(index)}
                onRemove={() => handleRemove(index)}
              />
            ))}
            <Button variant="outline" className="w-fit" onClick={handleAdd}>
              <PlusIcon />
              Add Conviction
            </Button>
          </div>
        </FieldWrapper>
      )}

      {isDialogOpen && (
        <ConvictionDialog
          startingValue={editingIndex === null ? emptyConviction : answers.convictions[editingIndex]}
          onSave={handleSave}
          onCancel={() => setIsDialogOpen(false)}
        />
      )}
    </>
  )
}

function ReferencesPage({ answers, update, errors }: PageProps) {
  return (
    <>
      <TextField
        id="referenceName"
        label="Name"
        value={answers.referenceName}
        onChange={(value) => update("referenceName", value)}
        error={errors.referenceName}
      />
      <TextField
        id="referenceTitle"
        label="Title"
        value={answers.referenceTitle}
        onChange={(value) => update("referenceTitle", value)}
        error={errors.referenceTitle}
      />
      <TextField
        id="referenceCompany"
        label="Company"
        value={answers.referenceCompany}
        onChange={(value) => update("referenceCompany", value)}
        error={errors.referenceCompany}
      />
      <TextField
        id="referenceAddress"
        label="Address"
        value={answers.referenceAddress}
        onChange={(value) => update("referenceAddress", value)}
        error={errors.referenceAddress}
      />
      <TextField
        id="referencePhone"
        label="Telephone"
        inputMode="tel"
        value={answers.referencePhone}
        onChange={(value) => update("referencePhone", formatPhone(value))}
        error={errors.referencePhone}
      />
      <TextField
        id="referenceEmail"
        label="Email Address"
        type="email"
        value={answers.referenceEmail}
        onChange={(value) => update("referenceEmail", value)}
        error={errors.referenceEmail}
      />
    </>
  )
}

function BackgroundPage({ answers, update, errors }: PageProps) {
  return (
    <>
      <RadioField
        label="Do you have a driver's license?"
        options={yesOrNo}
        value={answers.hasDriversLicense}
        onChange={(value) => update("hasDriversLicense", value)}
        error={errors.hasDriversLicense}
      />
      <RadioField
        label="Have you served in the military?"
        options={militaryAnswers}
        value={answers.servedInMilitary}
        onChange={(value) => update("servedInMilitary", value)}
        error={errors.servedInMilitary}
      />

      {answers.servedInMilitary === "Yes" && (
        <>
          <RadioField
            label="Honorable Discharge?"
            options={yesOrNo}
            value={answers.honorableDischarge}
            onChange={(value) => update("honorableDischarge", value)}
            error={errors.honorableDischarge}
          />
          <TextField
            id="yearsServed"
            label="Years Served"
            inputMode="numeric"
            value={answers.yearsServed}
            onChange={(value) => update("yearsServed", value)}
            error={errors.yearsServed}
          />
          <SelectField
            id="militaryBranch"
            label="Branch"
            options={militaryBranches}
            value={answers.militaryBranch}
            onChange={(value) => update("militaryBranch", value)}
            error={errors.militaryBranch}
          />
        </>
      )}

      <RadioField
        label="Do you own your own vehicle?"
        options={yesOrNo}
        value={answers.ownsVehicle}
        onChange={(value) => update("ownsVehicle", value)}
        error={errors.ownsVehicle}
      />
    </>
  )
}

function EducationPage({ answers, update, errors }: PageProps) {
  return (
    <>
      <SelectField
        id="educationLevel"
        label="Highest Education Earned"
        options={educationLevels}
        value={answers.educationLevel}
        onChange={(value) => update("educationLevel", value)}
        error={errors.educationLevel}
      />
      <TextField
        id="schoolName"
        label="School Name"
        value={answers.schoolName}
        onChange={(value) => update("schoolName", value)}
        error={errors.schoolName}
      />
      <TextField
        id="schoolLocation"
        label="City/State"
        value={answers.schoolLocation}
        onChange={(value) => update("schoolLocation", value)}
        error={errors.schoolLocation}
      />
      <TextField
        id="graduationDate"
        label="Graduation Date"
        type="date"
        value={answers.graduationDate}
        onChange={(value) => update("graduationDate", value)}
        error={errors.graduationDate}
      />
      <TextField
        id="major"
        label="Major/Degree"
        value={answers.major}
        onChange={(value) => update("major", value)}
        error={errors.major}
      />
    </>
  )
}

function WorkExperiencePage({ answers, update, errors }: PageProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  // Which job is being edited. null means a new one is being added.
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  function handleAdd() {
    setEditingIndex(null);
    setIsDialogOpen(true);
  }

  function handleEdit(index: number) {
    setEditingIndex(index);
    setIsDialogOpen(true);
  }

  function handleRemove(index: number) {
    const remaining = answers.jobs.filter((_, i) => i !== index);
    update("jobs", remaining);
  }

  function handleSave(job: Job) {
    if (editingIndex === null) {
      update("jobs", [...answers.jobs, job]);
    } else {
      const updated = [...answers.jobs];
      updated[editingIndex] = job;
      update("jobs", updated);
    }
    setIsDialogOpen(false);
  }

  return (
    <>
      <p className="mb-4 text-sm text-muted-foreground">
        Add any jobs you have had. If this is your first job, you can skip this step.
      </p>
      <FieldWrapper label="Past Jobs (optional)" required={false} error={errors.jobs}>
        <div className="grid gap-2">
          {answers.jobs.map((job, index) => (
            <EntryCard
              key={index}
              title={`${job.jobTitle} at ${job.employerName}`}
              details={`${job.startDate} to ${job.endDate}`}
              onEdit={() => handleEdit(index)}
              onRemove={() => handleRemove(index)}
            />
          ))}
          <Button variant="outline" className="w-fit" onClick={handleAdd}>
            <PlusIcon />
            Add Job
          </Button>
        </div>
      </FieldWrapper>

      {isDialogOpen && (
        <JobDialog
          startingValue={editingIndex === null ? emptyJob : answers.jobs[editingIndex]}
          onSave={handleSave}
          onCancel={() => setIsDialogOpen(false)}
        />
      )}
    </>
  )
}

function ResumeAndSignaturePage({ answers, update, errors }: PageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileError, setFileError] = useState<string>("");

  function handleFileChosen(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    // Clear the input so choosing the same file again still triggers a change
    event.target.value = "";

    if (!file) {
      return;
    }

    const fileName = file.name.toLowerCase();
    if (fileName.endsWith(".pdf") || fileName.endsWith(".docx")) {
      update("resumeFileName", file.name);
      setFileError("");
    } else {
      setFileError("Resume must be a .pdf or .docx file.");
    }
  }

  return (
    <>
      <FieldWrapper label="Resume (optional)" required={false} error={fileError}>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            Upload Resume
          </Button>
          <span className="text-sm text-muted-foreground">
            {answers.resumeFileName === "" ? "No file selected (.pdf or .docx)" : answers.resumeFileName}
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx"
            className="hidden"
            onChange={handleFileChosen}
          />
        </div>
      </FieldWrapper>

      <h3 className="mt-2 font-semibold">Application Acknowledgement and Waiver</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        I certify that the information in this application is true, sourced by you, and not incomplete.
        I understand that intentionally false or lacking information will disqualify me or lead to be fired if found out later,
        and I release the company and my references from any
        liability for providing information about me during the hiring process.
      </p>

      <TextField
        id="signature"
        label="Full Name (Signature)"
        value={answers.signature}
        onChange={(value) => update("signature", value)}
        error={errors.signature}
      />
      <TextField
        id="signatureDate"
        label="Date"
        type="date"
        value={answers.signatureDate}
        onChange={(value) => update("signatureDate", value)}
        error={errors.signatureDate}
      />
    </>
  )
}

// Review page

function ReviewSection({ title, onEdit, children }: {
  title: string;
  onEdit: () => void;
  children: ReactNode;
}) {
  return (
    <div>
      <button className="font-semibold underline-offset-4 hover:underline" onClick={onEdit}>
        {title}
      </button>
      <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
        {children}
      </dl>
    </div>
  )
}

function ReviewRow({ label, value }: { label: string; value: string | string[] }) {
  let displayValue = value;
  if (Array.isArray(value)) {
    displayValue = value.join(", ");
  }
  if (displayValue === "") {
    displayValue = "—";
  }

  return (
    <>
      <dt className="text-muted-foreground">{label}</dt>
      <dd>{displayValue}</dd>
    </>
  )
}

function ReviewPage({ answers, onEditSection }: {
  answers: Answers;
  onEditSection: (page: PageTitle) => void;
}) {
  return (
    <div className="grid gap-6">
      <p className="text-sm text-muted-foreground">
        Please review your information for correctness. Click a section title to go back and change it.
      </p>

      <ReviewSection title="Personal Information" onEdit={() => onEditSection("Personal Information")}>
        <ReviewRow label="First Name" value={answers.firstName} />
        <ReviewRow label="Last Name" value={answers.lastName} />
        <ReviewRow label="Street" value={answers.street} />
        <ReviewRow label="City" value={answers.city} />
        <ReviewRow label="State" value={answers.state} />
        <ReviewRow label="ZIP Code" value={answers.zip} />
        <ReviewRow label="Phone Number" value={answers.phone} />
        <ReviewRow label="Email" value={answers.email} />
        <ReviewRow label="Position Applying For" value={answers.position} />
        <ReviewRow label="Desired Salary" value={answers.salary} />
        <ReviewRow label="Over 18?" value={answers.isOver18} />
      </ReviewSection>

      <ReviewSection title="Emergency Contact" onEdit={() => onEditSection("Emergency Contact")}>
        <ReviewRow label="First Name" value={answers.contactFirstName} />
        <ReviewRow label="Last Name" value={answers.contactLastName} />
        <ReviewRow label="Street" value={answers.contactStreet} />
        <ReviewRow label="City" value={answers.contactCity} />
        <ReviewRow label="State" value={answers.contactState} />
        <ReviewRow label="ZIP Code" value={answers.contactZip} />
        <ReviewRow label="Phone Number" value={answers.contactPhone} />
        <ReviewRow label="Email" value={answers.contactEmail} />
        <ReviewRow label="Relationship" value={answers.contactRelationship} />
      </ReviewSection>

      <ReviewSection title="Demographics" onEdit={() => onEditSection("Demographics")}>
        <ReviewRow label="Race" value={answers.race} />
        <ReviewRow label="Gender" value={answers.gender} />
      </ReviewSection>

      <ReviewSection title="Availability" onEdit={() => onEditSection("Availability")}>
        <ReviewRow label="Days Available" value={answers.daysAvailable} />
        <ReviewRow label="Employment Desired" value={answers.employmentType} />
        <ReviewRow label="Hours per Week" value={answers.weeklyHours} />
        <ReviewRow label="Can Work Nights?" value={answers.canWorkNights} />
        <ReviewRow label="Ever Been Fired?" value={answers.hasBeenFired} />
        <ReviewRow label="Criminal Record?" value={answers.hasCriminalRecord} />
        {answers.hasCriminalRecord === "Yes" && answers.convictions.map((conviction, index) => (
          <Fragment key={index}>
            <ReviewRow label={`Conviction ${index + 1}`} value={`${conviction.type} on ${conviction.date}`} />
            <ReviewRow label="Description" value={conviction.description} />
            <ReviewRow label="Confinement" value={conviction.confinement} />
          </Fragment>
        ))}
      </ReviewSection>

      <ReviewSection title="References" onEdit={() => onEditSection("References")}>
        <ReviewRow label="Name" value={answers.referenceName} />
        <ReviewRow label="Title" value={answers.referenceTitle} />
        <ReviewRow label="Company" value={answers.referenceCompany} />
        <ReviewRow label="Address" value={answers.referenceAddress} />
        <ReviewRow label="Telephone" value={answers.referencePhone} />
        <ReviewRow label="Email Address" value={answers.referenceEmail} />
      </ReviewSection>

      <ReviewSection title="Background" onEdit={() => onEditSection("Background")}>
        <ReviewRow label="Driver's License?" value={answers.hasDriversLicense} />
        <ReviewRow label="Served in Military?" value={answers.servedInMilitary} />
        {answers.servedInMilitary === "Yes" && (
          <>
            <ReviewRow label="Honorable Discharge?" value={answers.honorableDischarge} />
            <ReviewRow label="Years Served" value={answers.yearsServed} />
            <ReviewRow label="Branch" value={answers.militaryBranch} />
          </>
        )}
        <ReviewRow label="Owns Vehicle?" value={answers.ownsVehicle} />
      </ReviewSection>

      <ReviewSection title="Education" onEdit={() => onEditSection("Education")}>
        <ReviewRow label="Highest Education" value={answers.educationLevel} />
        <ReviewRow label="School Name" value={answers.schoolName} />
        <ReviewRow label="City/State" value={answers.schoolLocation} />
        <ReviewRow label="Graduation Date" value={answers.graduationDate} />
        <ReviewRow label="Major/Degree" value={answers.major} />
      </ReviewSection>

      <ReviewSection title="Work Experience" onEdit={() => onEditSection("Work Experience")}>
        {answers.jobs.map((job, index) => (
          <Fragment key={index}>
            <ReviewRow label={`Job ${index + 1}`} value={`${job.jobTitle} at ${job.employerName}`} />
            <ReviewRow label="Dates" value={`${job.startDate} to ${job.endDate}`} />
            <ReviewRow label="Address" value={job.employerAddress} />
            <ReviewRow label="Telephone Number" value={job.employerPhone} />
            <ReviewRow label="Email Address" value={job.employerEmail} />
            <ReviewRow label="Reason for Leaving" value={job.reasonForLeaving} />
          </Fragment>
        ))}
      </ReviewSection>

      <ReviewSection title="Resume & Signature" onEdit={() => onEditSection("Resume & Signature")}>
        <ReviewRow label="Resume" value={answers.resumeFileName} />
        <ReviewRow label="Signature" value={answers.signature} />
        <ReviewRow label="Date" value={answers.signatureDate} />
      </ReviewSection>
    </div>
  )
}

// Step list (sidebar on desktop, slide-out menu on mobile)

function StepList({ currentPage, furthestPage, onSelectPage }: {
  currentPage: number;
  furthestPage: number;
  onSelectPage: (pageNumber: number) => void;
}) {
  return (
    <ol className="grid gap-2">
      {pageTitles.map((title, pageNumber) => {
        const isCurrent = pageNumber === currentPage;
        const isFinished = pageNumber < furthestPage && !isCurrent;
        const isLocked = pageNumber > furthestPage;

        return (
          <li key={title}>
            <button
              disabled={isLocked}
              onClick={() => onSelectPage(pageNumber)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50",
                isCurrent ? "border-primary font-medium" : "border-transparent"
              )}
            >
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full border text-xs",
                  isCurrent && "border-primary bg-primary text-primary-foreground",
                  isFinished && "bg-muted"
                )}
              >
                {pageNumber + 1}
              </span>
              {title}
            </button>
          </li>
        )
      })}
    </ol>
  )
}


// The app, it is written as a monolith

const savedProgress = loadSavedProgress();

function App() {
  const [answers, setAnswers] = useState<Answers>({ ...emptyAnswers, ...savedProgress?.answers });
  const [currentPage, setCurrentPage] = useState<number>(savedProgress?.currentPage ?? 0);
  const [furthestPage, setFurthestPage] = useState<number>(savedProgress?.furthestPage ?? 0);
  const [errors, setErrors] = useState<Errors>({});
  const [showSavedMessage, setShowSavedMessage] = useState<boolean>(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isStepMenuOpen, setIsStepMenuOpen] = useState<boolean>(false);

  const currentTitle = pageTitles[currentPage];
  const isFirstPage = currentPage === 0;
  const isReviewPage = currentTitle === "Review";
  const progressPercent = ((currentPage + 1) / pageTitles.length) * 100;

  // Change one answer, and clear its error since the user is changes/updating it
  function update<Field extends keyof Answers>(field: Field, value: Answers[Field]) {
    setAnswers({ ...answers, [field]: value });
    setErrors({ ...errors, [field]: "" });
  }

  function goToPage(pageNumber: number) {
    const newFurthestPage = Math.max(furthestPage, pageNumber);

    setCurrentPage(pageNumber);
    setFurthestPage(newFurthestPage);
    setErrors({});
    setIsStepMenuOpen(false);

    saveProgress({ answers, currentPage: pageNumber, furthestPage: newFurthestPage });
    setShowSavedMessage(true);

    window.scrollTo(0, 0);
  }

  function handleBack() {
    goToPage(currentPage - 1);
  }

  function handleContinue() {
    const pageErrors = findErrors(currentTitle, answers);

    if (hasErrors(pageErrors)) {
      setErrors(pageErrors);
      return;
    }

    goToPage(currentPage + 1);
  }

  function handleSubmit() {
    // Check every page. If one has a problem, take the user there and show the errors.
    for (let pageNumber = 0; pageNumber < pageTitles.length; pageNumber++) {
      const pageErrors = findErrors(pageTitles[pageNumber], answers);

      if (hasErrors(pageErrors)) {
        goToPage(pageNumber);
        setErrors(pageErrors);
        return;
      }
    }

    setShowSubmitConfirm(true);
  }

  function handleConfirmSubmit() {
    clearSavedProgress();
    setShowSubmitConfirm(false);
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <Layout>
        <h1 className="text-2xl font-semibold">Thank you!</h1>
        <p className="mt-2 text-muted-foreground">
          Your application was submitted successfully. You may now close this page.
        </p>
      </Layout>
    )
  }

  const pageProps = { answers, update, errors };

  return (
    <Layout>
      <header className="flex items-center gap-4">
        <img src="/unf-logo.png" alt="UNF logo" className="h-14 w-auto" />
        <h1 className="text-2xl font-semibold">UNFinished Business Employee Application</h1>
      </header>
      <p className="mt-2 text-xs text-muted-foreground">
        *This is not affiliated with UNF and is a project for CDA 4010 UI Design.
      </p>

      {/*sheet menu for mobile and progress abr */}
      <div className="mt-4 flex items-center gap-3">
        <Sheet open={isStepMenuOpen} onOpenChange={setIsStepMenuOpen}>
          <SheetTrigger render={<Button variant="outline" size="icon" className="md:hidden" />}>
            <MenuIcon />
            <span className="sr-only">Open steps</span>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Application Steps</SheetTitle>
            </SheetHeader>
            <nav className="overflow-y-auto px-4 pb-4">
              <StepList currentPage={currentPage} furthestPage={furthestPage} onSelectPage={goToPage} />
            </nav>
          </SheetContent>
        </Sheet>
        <Progress value={progressPercent} className="flex-1" />
        <span className="text-sm text-muted-foreground tabular-nums">
          Step {currentPage + 1} of {pageTitles.length}
        </span>


      </div>

      <div className="mt-6 grid gap-8 md:grid-cols-[240px_1fr]">
        {/* Step list sidebar on desktop */}
        <nav className="hidden md:block">
          <StepList currentPage={currentPage} furthestPage={furthestPage} onSelectPage={goToPage} />
        </nav>

        <main>
          <h2 className="mb-4 text-xl font-semibold">{currentTitle}</h2>

          <section className="grid gap-2">
            {currentTitle === "Personal Information" && <PersonalInformationPage {...pageProps} />}
            {currentTitle === "Emergency Contact" && <EmergencyContactPage {...pageProps} />}
            {currentTitle === "Demographics" && <DemographicsPage {...pageProps} />}
            {currentTitle === "Availability" && <AvailabilityPage {...pageProps} />}
            {currentTitle === "References" && <ReferencesPage {...pageProps} />}
            {currentTitle === "Background" && <BackgroundPage {...pageProps} />}
            {currentTitle === "Education" && <EducationPage {...pageProps} />}
            {currentTitle === "Work Experience" && <WorkExperiencePage {...pageProps} />}
            {currentTitle === "Resume & Signature" && <ResumeAndSignaturePage {...pageProps} />}
            {currentTitle === "Review" && (
              <ReviewPage answers={answers} onEditSection={(page) => goToPage(pageTitles.indexOf(page))} />
            )}
          </section>

          <footer className="mt-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {!isFirstPage && (
                <Button variant="outline" onClick={handleBack}>Back</Button>
              )}
              {showSavedMessage && (
                <span className="text-sm text-muted-foreground">Your progress is saved</span>
              )}
            </div>

            {isReviewPage ? (
              <Button onClick={handleSubmit}>Submit</Button>
            ) : (
              <Button onClick={handleContinue}>Continue</Button>
            )}
          </footer>
        </main>
      </div>

      <AlertDialog open={showSubmitConfirm} onOpenChange={setShowSubmitConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit application?</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to submit your application?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmSubmit}>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  )
}

export default App
