import { useMemo } from "react";
import { useTeamParticipants } from "./useTeamParticipants";

export function useEmailValidation(teamId: string) {
	const { data: participants, isLoading } = useTeamParticipants(teamId);

	const validator = useMemo(() => {
		return {
			/**
			 * Check if email already exists in team participants
			 */
			isEmailTaken: (email: string): boolean => {
				if (!participants || !email) return false;

				return participants.some(
					(participant) =>
						participant.email.toLowerCase() === email.toLowerCase(),
				);
			},

			/**
			 * Check if email is pending invitation (status = "Invited")
			 */
			hasEmailPendingInvitation: (email: string): boolean => {
				if (!participants || !email) return false;

				return participants.some(
					(participant) =>
						participant.email.toLowerCase() === email.toLowerCase() &&
						participant.status === "Invited",
				);
			},

			/**
			 * Check if email is active member (status = "Active")
			 */
			isEmailActiveMember: (email: string): boolean => {
				if (!participants || !email) return false;

				return participants.some(
					(participant) =>
						participant.email.toLowerCase() === email.toLowerCase() &&
						participant.status === "Active",
				);
			},

			/**
			 * Get participant details by email
			 */
			getParticipantByEmail: (email: string) => {
				if (!participants || !email) return null;

				return (
					participants.find(
						(participant) =>
							participant.email.toLowerCase() === email.toLowerCase(),
					) || null
				);
			},

			/**
			 * Get all existing emails (normalized to lowercase)
			 */
			getAllEmails: (): string[] => {
				if (!participants) return [];
				return participants.map((p) => p.email.toLowerCase());
			},

			isLoading,
		};
	}, [participants, isLoading]);

	return validator;
}
