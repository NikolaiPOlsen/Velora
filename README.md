# Velora

> [!WARNING]
> Velora is currently under active development. Features may be incomplete,
> changed, or missing. Use with caution.

Velora is a minimalistic customer and parts registration application designed for repair shops and service technicians. The app streamlines daily workflows by combining customer registration, parts ordering, and task management into one simple interface.
## The Problem
Repair shops today juggle multiple systems for customer registration, parts ordering through, and task tracking. This leads to lost information, wasted time, and unnecessary complexity.

## The Solution
Velora brings everything into one place:

- **Customer Registration** — Quickly register customers and their repair 
requests, automatically creating Trello cards for easy task tracking and 
team overview.

- **Parts Ordering** — Browse and order spare parts directly through the ASWO integration, with orders automatically linked to the relevant customer and Trello card.

- **Simple Overview** — All active jobs, customer information, and parts orders are visible in one clean interface, synced with your existing Trello boards.

- **Built for Simplicity** — Velora is designed to be intuitive and fast, minimizing the time spent on administration so technicians can focus on what matters — fixing things.

## Who Is It For?
Velora is built for repair shops, service technicians, and small businesses that handle customer repairs and parts ordering on a daily basis.

## Get Started

1. **Install dependencies**
```bash
   npm install
```

2. **Set up environment variables**
   
   Create a `.env` file in the root of the project and add the following:
   `EXPO_PUBLIC_TRELLO_API_KEY=your_api_key`
   `EXPO_PUBLIC_TRELLO_TOKEN=your_token`
   `EXPO_PUBLIC_TRELLO_LIST_ID_ARBEID=your_list_id`

3. **Start the app**
```bash
   npx expo start
```

Once started, you can open the app in:

- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)
