import { Check, Link } from 'lucide-react';
import { Button } from '../common/Button';
export const InviteButton = ({ copied, onCopy }: { copied: boolean; onCopy: () => void }) => <Button variant="secondary" fullWidth onClick={onCopy} className="gap-2"><span>{copied ? <Check className="h-4 w-4" /> : <Link className="h-4 w-4" />}</span>{copied ? 'Link Copied!' : 'Copy Invite Link'}</Button>;
