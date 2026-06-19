# FinVision: Microfinance Loan Management System

A database-driven loan management platform built for microfinance institutions to streamline loan operations, monitor repayment health, and surface actionable financial insights through intuitive dashboards. 

*Skills: Database Design · SQL · End-to-End System Development · Data Modeling · ETL Pipelines · Business Intelligence · Data Visualization (Superset / Power BI) · Dashboard Development · Risk Analytics · Cloud Infrastructure*

---

## Overview

FinVision addresses the operational and analytical challenges faced by microfinance institutions by centralizing loan portfolio management, client data, and financial reporting into a single system. The platform supports data-driven decision-making through real-time visibility into loan performance, borrower demographics, and officer-level accountability.

---

## Features

### Loan Portfolio Tracking
- Monitor total disbursed loan amounts, active loan counts, and aggregate portfolio value
- Categorize loans by type (agricultural, small business, personal) and track status across Active, Overdue, Closed, and Defaulted states
- Identify top borrowers by loan amount for risk assessment and cross-selling opportunities

### Client Demographics & Segmentation
- Profile borrowers across age, gender, location, income level, and loan history
- Segment clients by loan size, business type, and credit history to enable personalized offerings and targeted risk assessment
- Track client base growth over time, distinguishing new vs. returning borrowers

### Repayment & Delinquency Monitoring
- Calculate repayment rates and delinquency rates across the portfolio
- Track repayment trends over time to identify seasonal patterns or the impact of policy changes
- Flag missed payments and overdue loans for proactive collections management

### Financial Performance Monitoring
- Track interest income (AUM) generated across the lending portfolio
- Monitor non-AUM revenue streams including processing fees, penalties, and setup fees
- Compare revenue against operational costs for an at-a-glance view of financial health

### Loan Officer Performance
- Measure disbursement volume and loan recovery per officer
- Track delinquency rates by officer to surface accountability and coaching opportunities
- Log client interaction activity at the officer level

---

## Database Schema

**Core Tables**
- `Users` — Borrower profiles and demographic data
- `Loans` — Loan records including type, amount, status, and assigned officer
- `Repayments` — Repayment schedules, dates, and amounts
- `Loan Officers` — Officer profiles and assignment mappings
- `Transactions` — Financial transaction records including fees and penalties

**Under Review**
- `Collateral` — Collateral assets tied to loans
- `Penalty` — Penalty tracking for overdue accounts
- `Credit History` — Borrower credit history records

---

## Dashboards

| Dashboard | Key Metrics |
|---|---|
| **Loan Portfolio Overview** | Total disbursed, active loan count & value, status distribution, loan type mix, top borrowers |
| **Repayment & Delinquency** | Repayment rate, delinquency rate, repayment trends over time |
| **Client Demographics** | Age/gender/income breakdown, client segmentation, client growth over time |
| **Financial Performance** | Interest income (AUM), non-AUM charges, revenue vs. expense comparison |
| **Loan Officer Performance** | Disbursement by officer, recovery by officer, delinquency rate by officer, client interactions |

---

## Tech Stack

- **Database:** MYSQL
- **Visualization:** Power BI 

---
> Developed as part of IST 659 M003 — Group Psi  
> **Team:** Udayan Gaikwad, Mukta Patil, Sohail Mulla
