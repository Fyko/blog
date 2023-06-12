import {stripIndent} from 'common-tags';
import Image from 'next/image';
import altIntimidation from './alt_intimidation.png';
import emailFromPhisher from './email_from_phisher.png';
import firstTicket from './first_ticket.png';
import passwordsDm from './passwords_dm.png';
import sessionHj from './session.png';
import trashEmails from './trash_emails.png';
import {Post} from '@/Post';
import {HotBadge, NewBadge} from '@/client/components/badge';
import {Highlighter} from '@/client/components/highlighter';

export class Phished extends Post {
	public name = 'How I got phished';

	public slug = 'how-i-got-phished';

	public date = new Date('12 June 2023');

	public hidden = true;

	public keywords = ['phished', 'hacked', 'passwords', 'bitwarden'];

	public excerpt = 'I made a mistake, and I payed the price.';

	public badges = [<HotBadge />, <NewBadge />];

	public render() {
		return (
			<>
				<h1>{this.name}</h1>

				<Highlighter id="gpg" language="javascript">
					{stripIndent`
						BEGIN KEYBASE SALTPACK SIGNED MESSAGE.
						kXR7VktZdyH7rvq v5weRa0zkQCr5Eb x6vUZegsO3yEFwZ dGEjlMYgHp20aEX
						7HU1oYjzLbmO8mF a3gOknRYITNSVwR qq6GGqA5G1zw7dp 7eLrQihlPhgiPTi
						grw1AQGIO971yHa b6ivu3ybjd9sqYJ wfQeQIT06Jzjy6w BtywHju2nVjAzv6
						JS4YLhbYmjIIRhy qiowys5PWF6w8fy D4X1xO37nl83TFu N2gZ1M0k9kGGqHG
						j7Z2herAnwqJtwv mvVQAwIaqED5JR6 lL4MRburnXJmaDc nTCyCiffHrv1NSR
						sFGoqYNliqBLc9l ZFNuc80nb0f1xF2 9yIMazSJ2HhnMZN ZuNAQ0XldHUcv9I
						iG7J5Yfq4DLqxW4 VTeSaDVmN1phCqn NbbTtRiSv7nU3Fc JEQyLg2BmwhCyjr
						c0EOkazR9zR3tLR LUCWUfwQHxUvOHe JaQkgXQkOGUNRl3 1czqhz0dLkjz7bK
						EvsLU3raODBCULV fPTniD5L87HOEdZ lU.
						END KEYBASE SALTPACK SIGNED MESSAGE.
						// My name is Carter Himmel.
						// These are my points of presence as of June 12th:
						// - Keybase (@fyko)
						// - Twitter (@fykowo)
						// - Discord (@yarn.lock) (492374435274162177)
						// - GitHub (@carterhimmel or @Fyko) (required org @sycertech)
						// - fyko.net	
						// - blog.fyko.net
					`}
				</Highlighter>

				<p>
					The morning of June 2nd, I received an unsuspecting DM from an old friend on Discord. They
					asked if I was willing to help them with a project they were working on.
				</p>

				<blockquote>
					It's 2D adventure project, we need peoples who can play and give review for 5-10 minutes.
				</blockquote>

				<p>
					Being a regular in a large programming-focused Discord server, I knew about the "will you
					try my game.exe" scam. But, this was someone I knew &mdash; someone who was on my
					friendlist for some time. Plus, I was in a good mood and in a rush to go on my morning
					run.
				</p>

				<p>
					I was skeptical, but I took some measures to protect myself. Looking back, obviously it
					wasn't enough.
				</p>

				<p>
					They sent me an executable, which I ran through{' '}
					<a href="https://virustotal.com" rel="noreferrer" target="_blank">
						VirusTotal
					</a>
					. It retuned inconclusive. I opened Task Manager to inspect the process as it ran -- and
					it didn't work the first time. I told them it didn't work, and they sent me another
					executable, which I scanned again. Inconclusive. And, it didn't work again. I had given
					them the benefit of the doubt at this point, and didn't scan the third executable.
				</p>

				<p>
					My first <b>big</b> mistake.
				</p>

				<p>After running it, my Discord client and Chrome crashed.</p>

				<p>
					I reopened Discord, and it asked me to log in again. Anyone who's been using Discord for
					long enough knows what that means &mdash; your password has been changed. I didn't know
					what Chrome crashing meant, but I soon found out.
				</p>

				<h2>Damage Control</h2>

				<p>A minute after, I received this email from the phisher:</p>
				<Image alt="Threatening email from the phisher" src={emailFromPhisher.src} />

				<p>
					Seeing he was holding my Discord account hostage, I immediately started reaching out to
					friends who work closely with Discord that may be able to help me. I knew Trust &amp;
					Safety (T&amp;S) would likely take some time, so I wanted to get ahead of the phisher. I
					tried to find anyone who might be able to suspend my account until T&amp;S could get back
					to me.
				</p>

				<p>
					Thankfully, my account was suspended relatively quickly, giving me peace, and giving
					T&amp;S time to get back to me.
				</p>

				<p>
					Waiting for that, however, my anxiety was through the roof. I figured it wouldn't hurt to
					stall the idiot until the account was suspended. I added him on Discord on an alt account,
					and started talking to him.
				</p>

				<p>
					I was anxious, and I was scared. I had zero intention of paying him, because I knew that
					would only make things worse. He'd either ask for more, or just take it and run.
				</p>

				<p>
					Anxious but in control, I kept taking a long time to respond, asking dumb questions
					&mdash; anything to stall.
				</p>

				<p>Until he dropped this bomb:</p>
				<Image alt="Phisher showing he has my passwords, too" src={passwordsDm.src} />

				<h3>Holy. Shit.</h3>

				<p>
					It was much worse than I had anticipated. That's why my Chrome crashed &mdash; he was
					stealing my passwords in Chrome Password Manager, as well as my sessions/cookies.
				</p>

				<p>
					My anxity cranked to a 10. I was shaking while trying my damndest to:
					<ul>
						<li>freeze my cards</li>
						<li>freeze my credit</li>
						<li>
							change all my important passwords:
							<ul>
								<li>emails first, gotta see what accounts he's trying to get into</li>
								<li>then finances</li>
								<li>
									then any sites with Personally Identifiable Information (PII) and/or a payment
									method
								</li>
							</ul>
						</li>
						<li>deal with this dickhead</li>
					</ul>
					It was beneficial to freeze my cards first because I could worry less about all the dozens
					of sites and services that have one of my cards linked. This article was sponsored by
					Privacy.com (it wasn't :/, but more about them to come).
				</p>

				<p>
					After being reassured by a few people that I was doing the right thing (changing
					passwords, not paying the data ransom), I started to calm down. I was finally able to go
					on my run, which definitely helped with the stress.
				</p>

				<p>Shit hit the fan, but I was cleaning it up.</p>

				<p>
					I was confident I had recovered everything important except for my Discord account. To
					most, it's just another social media account. But for me, it's how I connect with my work,
					clients, and online friends. It's a huge piece of my online presence.
				</p>

				<h2>More Intimidation</h2>
				<p>
					The weekend (June 3 & 4) following this incident, I was painting the basement with my dad.
					It was nice to have a distraction, and something fun and engaging to do. I was frequently
					checking my phone and email, but nothing horrible happened.
				</p>

				<p>
					The last major time he tried to intimidate me was the evening of Saturday, June 3rd. Dad
					and I had to head back to Home Depot to buy more paint and a new paint sprayer (you know
					the struggle), and on the way back. I started getting message notifications on my alt
					account.
				</p>

				<p>
					I managed to forgot to change the password on my alt. He got in, added his main account
					(which is now banned), and started intimidating me. Offering a way to get my Discord
					account back, but I knew it was bullshit. I couldn't even attempt a password reset because
					of the suspension, so I knew he was lying.
				</p>

				<Image alt="Phisher intimidating me again" src={altIntimidation.src} />

				<p>I changed the sent no messages, changed the password, turned on 2FA, and blocked him.</p>

				<h2>Putting it all together</h2>

				<p>
					I was still paranoid, especially after that, so when we got home from Home Depot and I
					went up to my computer to do a little more fortifying.
				</p>

				<p>
					I reverified my Google account 2FA, switched to an authenticator app, and changed my
					password again. Then I noticed something odd. Until this point, I thought I flushed him
					out of everything important.
				</p>

				<p>Then I saw this:</p>
				<Image alt="The Hijacked session" src={sessionHj.src} />

				<p>
					He was still in my Google account until a few minutes before I fortified it. Seeing him
					out now, my paranoia and stress came down a bit. But, I kept investigating.
				</p>

				<h3>My Discord Account</h3>

				<p>
					I realized, I still don't know exactly he stole my account. I first searched for emails
					from <code>discord.com</code> and it only showed emails I recognized. So, I checked my
					trash can.
				</p>

				<Image alt="Discord emails in my trash can" src={trashEmails.src} />

				<p>
					Eight emails from Discord, all in my trash can. I didn't delete them &mdash; I didn't even
					see them, nor did I get notifications. I can only assume he marked all emails from Discord
					as spam, so he knew where to look for them and I wouldn't get notifications.
				</p>

				<p>He used the hijacked session to receive (AND SEND!) emails from Discord.</p>

				<p>
					There was another email not included in the screenshot above, but it was an important one.
					He created a support ticket on my behalf.
				</p>

				<Image alt="Support ticket he created" src={firstTicket.src} />

				<p>
					He created a ticket saying my account was stolen, and Discord automation moved the account
					back to my email within about 20 minutes. As you'll see from the email photo above, he
					also created a new account with my email right after changing the password on my main.
					Seems he did that so when support moved my account back to my email, he could still have
					access to it.
				</p>

				<p>
					And it worked. My account was back under my email with a different password and 2fa key.
				</p>

				<h4>Trust &amp; Safety</h4>

				<p>
					Waiting for T&amp;S to get back to me was agonizing. The suspension expired on Friday,
					June 9th at 7pm. If they didn't respond it time, the guy could have gotten my account
					back, and the suspension wouldn't summed to nothing.
				</p>

				<p>
					Checking my email all day, nothing. It was 4pm, still nothing. I was getting nervous.
					Discord's based in San Francisco, so the ban would expire at 6pm for them, but it was a
					Friday. Who the hell works til 6pm on a Friday?
				</p>

				<p>As a last ditch effort, I sent a password reset request to my email.</p>

				<p>
					<b>It worked.</b>
				</p>

				<p>
					I received the email, reset my password, and turned on 2FA. No response from T&amp;S, but
					I had my account back. No clue how, but I'm not gonna question it. I was so relieved.
				</p>

				<p>
					The phisher left that one programming server I mentioned earlier, so I rejoined. The only
					other thing he did was send phishy DMs to a bunch of people on my friendlist, who I
					informed that I was compromised.
				</p>

				<h2>Conclusion</h2>

				<h3>What I learned</h3>
				<ul>
					<li>I ought to use Privacy.com more</li>
					<li>
						2fa for EVERYTHING. Luckily, I already do for most important things, but other sites are
						catching up
					</li>
					<li>Changing your password doesn't always invalidate all sessions</li>
					<li>Do not run random code from strangers</li>
				</ul>

				<h3>Other notes</h3>
				<ul>
					<li>keybase has been a great tool for me to verify my identity</li>
				</ul>

				<p>
					Frankly, I'm embarassed and ashamed that I fell for this. I'm a programmer &mdash; I
					should have known better, and I should have been more careful. Regardless, I learned a lot
					from this experience, and I hope you did too.
				</p>
			</>
		);
	}
}
