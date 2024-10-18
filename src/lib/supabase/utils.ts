import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

import {
  Animal,
  AnimalId,
  Bonus,
  Notification,
  SpinItem,
  Stage,
  Ticket,
  User,
} from "../types";
import supabase from "./client";

export async function doesEmailExist(email: string) {
  const { data, error } = await supabase.rpc("check_email_exists", {
    user_email: email,
  });
  if (error) {
    console.error("Error checking email:", error);
    return false;
  }

  return data;
}

export async function getUserDataById(userId: string) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select(
        "username, is_advanced, credit, free_votes, withdraw_chance, vote_disabled_date"
      )
      .eq("id", userId)
      .single();

    if (error) {
      throw new Error(`Error fetching user data: ${error.message}`);
    }

    if (!data) {
      throw new Error("No user data found for the given ID.");
    }

    const userData: Pick<
      User,
      | "username"
      | "money"
      | "votes"
      | "isAdvancedUser"
      | "withdrawChance"
      | "voteDisabledDate"
    > = {
      username: data.username,
      money: data.credit,
      votes: data.free_votes,
      isAdvancedUser: data.is_advanced,
      withdrawChance: Number(data.withdraw_chance),
      voteDisabledDate:
        data.vote_disabled_date !== null
          ? new Date(data.vote_disabled_date)
          : null,
    };

    return userData;
  } catch (err) {
    return null;
  }
}

export function createUserRealtimeChannel(
  userId: string,
  onUserChange: (
    payload: RealtimePostgresChangesPayload<{
      [key: string]: any;
    }>
  ) => void
) {
  const userChannelSubscription = supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "users",
        filter: `id=eq.${userId}`,
      },
      onUserChange
    )
    .subscribe();

  return userChannelSubscription;
}

export async function getAnimalData() {
  try {
    const { data, error } = await supabase
      .from("animals")
      .select("id, name, description, vote");

    if (error) {
      throw new Error(`Error fetching animal data: ${error.message}`);
    }

    if (!data || data.length === 0) {
      throw new Error("No animal data found.");
    }

    const animalData: Pick<Animal, "id" | "name" | "description" | "vote">[] =
      data.map((animal) => ({
        id: animal.id,
        name: animal.name,
        description: animal.description,
        vote: animal.vote,
      }));

    return animalData;
  } catch (err) {
    return null;
  }
}

export function createAnimalRealtimeChannel(
  onAnimalChange: (
    payload: RealtimePostgresChangesPayload<{
      [key: string]: any;
    }>
  ) => void
) {
  const animalChannelSubscription = supabase
    .channel("custom-animal-channel")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "animals",
      },
      onAnimalChange
    )
    .subscribe();

  return animalChannelSubscription;
}

export async function getAllStageData() {
  try {
    const { data, error } = await supabase
      .from("stages")
      .select(
        "id, prize_pool, ended_at, created_at, stage_result, prize_for_gold, prize_for_silver, prize_for_bronze"
      )
      .eq("is_active", false)
      .order("created_at", { ascending: false })
      .limit(24);

    if (error) {
      throw new Error(`Error fetching stage data: ${error.message}`);
    }

    if (!data) {
      throw new Error("No stage data found.");
    }

    const stageData: Stage[] = data.map((stage) => ({
      id: stage.id,
      prizePool: stage.prize_pool,
      endedAt: new Date(stage.ended_at),
      startedAt: new Date(stage.created_at),
      prizeForGold: stage.prize_for_gold,
      prizeForSilver: stage.prize_for_silver,
      prizeForBronze: stage.prize_for_bronze,
      stageResult: stage.stage_result,
    }));

    return stageData;
  } catch (err) {
    return null;
  }
}

export async function getStageData() {
  try {
    const { data, error } = await supabase
      .from("stages")
      .select("id, prize_pool, ended_at, created_at")
      .eq("is_active", true)
      .limit(1)
      .single();

    if (error) {
      throw new Error(`Error fetching stage data: ${error.message}`);
    }

    if (!data) {
      throw new Error("No stage data found.");
    }

    const stageData: Stage = {
      id: data.id,
      prizePool: data.prize_pool,
      endedAt: new Date(data.ended_at),
      startedAt: new Date(data.created_at),
    };

    return stageData;
  } catch (err) {
    return null;
  }
}

export function createStageRealtimeChannel(
  onStageChange: (
    payload: RealtimePostgresChangesPayload<{
      [key: string]: any;
    }>
  ) => void
) {
  const stageChannelSubscription = supabase
    .channel("custom-stage-channel")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "stages",
      },
      onStageChange
    )
    .subscribe();

  return stageChannelSubscription;
}

export async function getSpinData(userId: string) {
  try {
    const { data, error } = await supabase
      .from("spins")
      .select("type, amount")
      .eq("is_used", false)
      .eq("user_id", userId)
      .limit(1)
      .maybeSingle();

    if (error) {
      throw new Error(`Error fetching spin data: ${error.message}`);
    }

    if (!data) {
      throw new Error("No spin data found.");
    }

    const spinData: SpinItem = {
      type: data.type as Bonus,
      amount: Number(data.amount),
    };

    return spinData;
  } catch (err) {
    return null;
  }
}

export function createSpinRealtimeChannel(
  onSpinChange: (
    payload: RealtimePostgresChangesPayload<{
      [key: string]: any;
    }>
  ) => void,
  userId: string
) {
  const spinChannelSubscription = supabase
    .channel("custom-spin-channel")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "spins",
        filter: `user_id=eq.${userId}`,
      },
      onSpinChange
    )
    .subscribe();

  return spinChannelSubscription;
}

export async function applySpin() {
  let { error } = await supabase.rpc("apply_spin");
  if (error) {
    console.error(error);
    throw error;
  } else {
    return true;
  }
}

export async function getActiveTicketData(stageId: string, userId: string) {
  try {
    const { data, error } = await supabase
      .from("tickets")
      .select("order, created_at")
      .eq("stage_id", stageId)
      .eq("user_id", userId);

    if (error) {
      console.error(`Error fetching ticket data: ${error.message}`);
      return null;
    }

    if (!data || data.length === 0) {
      console.info("No ticket data found.");
      return null;
    }

    const ticketData: Ticket[] = data.map((ticket) => ({
      order: ticket.order as AnimalId[],
      createdAt: new Date(ticket.created_at),
    }));

    return ticketData;
  } catch (err) {
    return null;
  }
}

export function createTicketRealtimeChannel(
  onTicketChange: (
    payload: RealtimePostgresChangesPayload<{
      [key: string]: any;
    }>
  ) => void,
  userId: string
) {
  const ticketChannelSubscription = supabase
    .channel("custom-ticket-channel")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "tickets",
        filter: `user_id=eq.${userId}`,
      },
      onTicketChange
    )
    .subscribe();

  return ticketChannelSubscription;
}

export async function buyNewTicket(order: AnimalId[]) {
  const { error } = await supabase.rpc("buy_ticket", {
    p_order: order,
  });
  if (error) {
    console.error(error);
    throw error;
  } else {
    return true;
  }
}

export async function voteTo(animalId: AnimalId, amount: number) {
  const { error } = await supabase.rpc("vote_to", {
    amount,
    animal_name: animalId,
  });
  if (error) {
    console.error(error);
    throw error;
  } else {
    return true;
  }
}

export async function getNotificationData(userId: string) {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .select("id, content, is_read, is_notified, created_at")
      .eq("user_id", userId)
      .eq("is_deleted", false);

    if (error) {
      console.error(`Error fetching notification data: ${error.message}`);
      return null;
    }

    if (!data || data.length === 0) {
      console.info("No notification data found.");
      return null;
    }

    const notificationData: Notification[] = data.map((notification) => ({
      id: notification.id,
      content: notification.content,
      isRead: notification.is_read,
      isNotified: notification.is_notified,
      createdAt: new Date(notification.created_at),
    }));

    return notificationData;
  } catch (err) {
    return null;
  }
}

export function createNotificationRealtimeChannel(
  onNotificationChange: (
    payload: RealtimePostgresChangesPayload<{
      [key: string]: any;
    }>
  ) => void,
  userId: string
) {
  const notificationChannelSubscription = supabase
    .channel("custom-notification-channel")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "notifications",
        filter: `user_id=eq.${userId}`,
      },
      onNotificationChange
    )
    .subscribe();

  return notificationChannelSubscription;
}

export async function updateNotification(
  userId: string,
  notificationId: string,
  payload: Partial<Pick<Notification, "isNotified" | "isRead">> & {
    isDeleted?: boolean;
  }
) {
  try {
    const updateData: Partial<{
      is_notified: boolean;
      is_read: boolean;
      is_deleted: boolean;
    }> = {};
    payload.isNotified !== undefined &&
      (updateData.is_notified = payload.isNotified);
    payload.isRead !== undefined && (updateData.is_read = payload.isRead);
    payload.isDeleted !== undefined &&
      (updateData.is_deleted = payload.isDeleted);

    const { error } = await supabase
      .from("notifications")
      .update(updateData)
      .eq("id", notificationId)
      .eq("user_id", userId);

    if (error) {
      console.error(`Error updating notification: ${error.message}`);
      return null;
    }
  } catch (err) {
    console.error(`Unexpected error: ${err}`);
    return null;
  }
}

export async function getUserDataByStageId(
  stageId: string,
  pageLimit: number = 10,
  pageOffset: number = 0
): Promise<
  {
    username: string;
    orders: AnimalId[][];
  }[]
> {
  const { data, error } = await supabase.rpc(
    "get_users_with_tickets_by_stage",
    {
      page_limit: pageLimit,
      page_offset: pageOffset,
      p_stage_id: stageId,
    }
  );
  if (error) {
    console.error(error);
    throw error;
  } else {
    return data.map(
      (user_with_tickets: {
        user_name: string;
        concatenated_orders: string[];
      }) => ({
        username: user_with_tickets.user_name as string,
        orders: user_with_tickets.concatenated_orders.map(
          (concatenated_order: string) =>
            concatenated_order.split("_") as AnimalId[]
        ),
      })
    );
  }
}
